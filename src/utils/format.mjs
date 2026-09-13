/**
 * Небольшие утилиты форматирования. Держим отдельно, чтобы не дублировать
 * по страницам.
 */
const MONTHS_RU = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

/** '2026-06-18' → '18 июня 2026'. Для datetime используйте исходную ISO-строку. */
export function formatDateRu(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS_RU[m - 1]} ${y}`;
}

/** 5900 → '5 900 ₽' (неразрывные тонкие пробелы для разрядов). */
export function formatRub(value) {
  const n = Number(value) || 0;
  return `${n.toLocaleString('ru-RU').replace(/ /g, ' ')} ₽`;
}
