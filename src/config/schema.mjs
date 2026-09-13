/**
 * ГЕНЕРАТОРЫ STRUCTURED DATA (Schema.org)
 * ------------------------------------------------------------------
 * Только те данные, что реально заданы в config. Никаких выдуманных
 * рейтингов, отзывов, наград и количества клиентов. Пустые значения
 * (concept-заглушки) в разметку не попадают.
 */
import { SITE, SITE_URL, CONTACTS, BUSINESS } from './site.mjs';

/** Подтверждённые публичные каналы для sameAs. */
function sameAs() {
  return [CONTACTS.telegram, CONTACTS.whatsapp, CONTACTS.instagram].filter(Boolean);
}

/** Убирает пустые/undefined поля, чтобы не засорять разметку. */
function clean(node) {
  Object.keys(node).forEach((k) => {
    const v = node[k];
    if (v === undefined || v === '' || v === null) delete node[k];
    if (Array.isArray(v) && v.length === 0) delete node[k];
  });
  return node;
}

/** Почтовый адрес — собирается только из заполненных полей. */
function postalAddress() {
  const a = BUSINESS.address;
  const node = clean({
    '@type': 'PostalAddress',
    streetAddress: a.streetAddress,
    addressLocality: a.addressLocality,
    addressRegion: a.addressRegion,
    postalCode: a.postalCode,
    addressCountry: a.addressCountry,
  });
  return Object.keys(node).length > 1 ? node : undefined;
}

/** Часы работы в формате schema.org OpeningHoursSpecification. */
function openingHoursSpec() {
  if (!BUSINESS.openingHours?.length) return undefined;
  return BUSINESS.openingHours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days.map((d) => dayName(d)),
    opens: h.opens,
    closes: h.closes,
  }));
}

const DAY = {
  Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday',
  Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday',
};
function dayName(d) {
  return `https://schema.org/${DAY[d] || d}`;
}

/**
 * LocalBusiness (HealthAndBeautyBusiness) — основная сущность бренда.
 * Используется на главной и странице контактов.
 */
export function beautyBusinessSchema({ image } = {}) {
  const geo =
    BUSINESS.geo?.latitude && BUSINESS.geo?.longitude
      ? { '@type': 'GeoCoordinates', latitude: BUSINESS.geo.latitude, longitude: BUSINESS.geo.longitude }
      : undefined;

  return clean({
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': new URL('/#business', SITE_URL).href,
    name: SITE.brand,
    description: `${SITE.category}: волосы, окрашивание, маникюр, брови и уход за лицом.`,
    url: SITE_URL,
    telephone: CONTACTS.phoneRaw,
    email: CONTACTS.email,
    priceRange: BUSINESS.priceRange,
    image: image ? new URL(image, SITE_URL).href : undefined,
    address: postalAddress(),
    geo,
    areaServed: BUSINESS.areaServed ? { '@type': 'GeoCircle', description: BUSINESS.areaServed } : undefined,
    openingHoursSpecification: openingHoursSpec(),
    sameAs: sameAs(),
  });
}

/** Organization — бренд как организация (для главной). */
export function organizationSchema({ logo } = {}) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': new URL('/#organization', SITE_URL).href,
    name: SITE.brand,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: logo ? new URL(logo, SITE_URL).href : undefined,
    sameAs: sameAs(),
  });
}

/** WebSite — для главной. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.brand,
    url: SITE_URL,
    inLanguage: SITE.lang,
  };
}

/**
 * Service — направление студии. Данные приходят из src/data/services.mjs.
 * Цены не проставляем как точные — они концептуальные (priceRange уровня бренда).
 */
export function serviceSchema(service) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription || service.summary,
    url: new URL(`/services/${service.slug}/`, SITE_URL).href,
    areaServed: BUSINESS.areaServed ? { '@type': 'GeoCircle', description: BUSINESS.areaServed } : undefined,
    provider: {
      '@type': 'HealthAndBeautyBusiness',
      '@id': new URL('/#business', SITE_URL).href,
      name: SITE.brand,
    },
  });
}

/** Person — мастер студии. Данные из src/data/team.mjs. */
export function personSchema(master, { image } = {}) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: master.name,
    jobTitle: master.role,
    description: master.specialization,
    worksFor: {
      '@type': 'HealthAndBeautyBusiness',
      '@id': new URL('/#business', SITE_URL).href,
      name: SITE.brand,
    },
    image: image ? new URL(image, SITE_URL).href : undefined,
    url: new URL('/team/', SITE_URL).href,
  });
}

/** Article — для статьи журнала. */
export function articleSchema({ headline, description, path, image, datePublished, dateModified, author }) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    inLanguage: SITE.lang,
    mainEntityOfPage: new URL(path, SITE_URL).href,
    image: image ? new URL(image, SITE_URL).href : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': author?.type === 'Person' ? 'Person' : 'Organization',
      name: author?.name || SITE.brand,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.brand,
      '@id': new URL('/#organization', SITE_URL).href,
    },
  });
}

/**
 * FAQPage — только если на странице реально есть блок вопросов-ответов.
 * items: [{ q, a }]
 */
export function faqSchema(items) {
  if (!items?.length) return undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}
