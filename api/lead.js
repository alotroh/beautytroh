/**
 * VERCEL SERVERLESS FUNCTION — приём заявок с формы записи и отправка в Telegram.
 * ------------------------------------------------------------------
 * Эндпоинт: POST /api/lead
 * Форма (src/components/BookingSection.astro) шлёт сюда JSON:
 *   { name, contact, service, task, company }   (company — honeypot)
 *
 * НАСТРОЙКА В VERCEL (Project → Settings → Environment Variables):
 *   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
 *   TELEGRAM_CHAT_ID   — chat id получателя (узнать у @userinfobot)
 * Токен и chat id в репозиторий НЕ попадают. Пока они не заданы, форма
 * на сайте работает в concept-режиме (предлагает написать напрямую).
 */

const MAX = { name: 120, contact: 160, service: 120, task: 3000 };
const clip = (v, n) => String(v ?? '').trim().slice(0, n);

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body) {
    try {
      return JSON.parse(req.body);
    } catch {
      return Object.fromEntries(new URLSearchParams(req.body));
    }
  }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return Object.fromEntries(new URLSearchParams(raw));
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return res.status(400).json({ ok: false, error: 'bad_request' });
  }

  // Honeypot: настоящие люди это поле не видят и не заполняют.
  if (clip(body.company, 50)) {
    return res.status(200).json({ ok: true }); // тихо игнорируем спам
  }

  const name = clip(body.name, MAX.name);
  const contact = clip(body.contact, MAX.contact);
  const service = clip(body.service, MAX.service);
  const task = clip(body.task, MAX.task);

  if (!name || !contact) {
    return res.status(422).json({ ok: false, error: 'name_and_contact_required' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  const text =
    '💇 Новая заявка на запись — BEAUTYTROH\n\n' +
    `Имя: ${name}\n` +
    `Контакт: ${contact}\n` +
    (service ? `Услуга: ${service}\n` : '') +
    (task ? `Комментарий: ${task}\n` : '');

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
    if (!tgRes.ok) {
      return res.status(502).json({ ok: false, error: 'telegram_failed' });
    }
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: 'telegram_unreachable' });
  }
}
