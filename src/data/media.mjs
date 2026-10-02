/**
 * КАРТА ИЗОБРАЖЕНИЙ
 * ------------------------------------------------------------------
 * Реальные фото из /media, скопированные в src/assets/media с безопасными
 * именами и импортированные как ImageMetadata (astro:assets → webp, адаптив).
 *
 * SERVICE_IMAGES  — главное фото направления (fallback для карточек и intro).
 * PROCEDURE_IMAGES — фото под конкретную процедуру (ключ = название карточки).
 *                    Значение-массив рендерится как две фотки рядом (split).
 * MASTER_IMAGES   — портреты мастеров.
 */
import hair1 from '../assets/media/hair-1.jpg';
import hair2 from '../assets/media/hair-2.jpg';
import muzhskaya from '../assets/media/muzhskaya-strizhka.jpg';
import chelka from '../assets/media/chelka.jpg';
import uhodVolos from '../assets/media/uhod-volos.jpg';
import nails from '../assets/media/nails.jpg';
import okrashivanie from '../assets/media/okrashivanie.jpg';
import brovi from '../assets/media/brovi.jpg';
import uhod from '../assets/media/uhod-za-litsom.jpg';
import portrait1 from '../assets/media/portrait-1.jpg';
import portrait2 from '../assets/media/portrait-2.jpg';
import portrait3 from '../assets/media/portrait-3.jpg';
import portrait4 from '../assets/media/portrait-4.jpg';
import portrait5 from '../assets/media/portrait-5.jpg';
import heroStudio from '../assets/media/hero-studio.png';
import heroModel from '../assets/media/hero-model.png';
import heroNew from '../assets/media/hero-new.png';

// Фото карточек окрашивания/бровей/маникюра/лица (Unsplash, свободная лицензия).
import okrTonirovanie from '../assets/media/stock/okr-tonirovanie.jpg';
import okrOdinTon from '../assets/media/stock/okr-odin-ton.jpg';
import okrAirtouch from '../assets/media/stock/okr-airtouch.jpg';
import okrMelirovanie from '../assets/media/stock/okr-melirovanie.jpg';
import okrBlond from '../assets/media/stock/okr-blond.jpg';
import browKorrekciya from '../assets/media/stock/brow-korrekciya.jpg';
import browOkrashivanie from '../assets/media/stock/brow-okrashivanie.jpg';
import browLaminirovanie from '../assets/media/stock/brow-laminirovanie.jpg';
import browLaminOkr from '../assets/media/stock/brow-lamin-okr.jpg';
import naGel from '../assets/media/stock/na-gel.jpg';
import naBezPokrytiya from '../assets/media/stock/na-bez-pokrytiya.jpg';
import naSnyatie from '../assets/media/stock/na-snyatie.jpg';
import naUkreplenie from '../assets/media/stock/na-ukreplenie.jpg';
import naDizayn from '../assets/media/stock/na-dizayn.jpg';
import faceChistka from '../assets/media/stock/face-chistka.jpg';
import faceUhod from '../assets/media/stock/face-uhod.jpg';
import facePiling from '../assets/media/stock/face-piling.jpg';
import faceExpress from '../assets/media/stock/face-express.jpg';

/** Главное фото направления. */
export const SERVICE_IMAGES = {
  volosy: hair1,
  okrashivanie,
  manikyur: nails,
  brovi,
  'uhod-za-litsom': uhod,
};

/** Пара фото «Волосы» — идут вместе в одно поле (split). */
export const HAIR_STRIP = [hair1, hair2];

/**
 * Фото по названию процедуры. Массив = две фотки рядом в одном поле.
 * Названия должны совпадать с `name` процедур в src/data/services.mjs.
 */
export const PROCEDURE_IMAGES = {
  // Волосы
  'Женская стрижка': [hair1, hair2],
  'Мужская стрижка': muzhskaya,
  'Коррекция формы, чёлка': chelka,
  'Укладка': hair1,
  'Уход для волос': uhodVolos,
  // Окрашивание
  'Тонирование, освежение цвета': okrTonirovanie,
  'Окрашивание в один тон': okrOdinTon,
  'AirTouch': okrAirtouch,
  'Мелирование, растяжка': okrMelirovanie,
  'Блонд, осветление': okrBlond,
  // Брови
  'Коррекция формы': browKorrekciya,
  'Коррекция и окрашивание': browOkrashivanie,
  'Ламинирование бровей': browLaminirovanie,
  'Ламинирование и окрашивание': browLaminOkr,
  // Маникюр
  'Маникюр с покрытием': naGel,
  'Маникюр без покрытия': naBezPokrytiya,
  'Снятие и новое покрытие': naSnyatie,
  'Укрепление, выравнивание': naUkreplenie,
  'Сдержанный дизайн': naDizayn,
  // Уход за лицом
  'Чистка лица': faceChistka,
  'Уходовая процедура': faceUhod,
  'Пилинг': facePiling,
  'Экспресс-уход': faceExpress,
};

/** Портреты мастеров (по id). */
export const MASTER_IMAGES = {
  marina: portrait1,
  anna: portrait2,
  darya: portrait3,
  sofia: portrait4,
  kira: portrait5,
};

/** Интерьер студии — тёплый мокко-салон (блок «Пространство», «О студии»). */
export const INTERIOR = heroStudio;

/** Главное фото hero: интерьер студии (кадр «тёмная стена слева, салон справа»
 *  идеально ложится под текст). HERO_IMAGE_ALT — beauty-портрет как альтернатива. */
export const HERO_IMAGE = heroNew;
export const HERO_IMAGE_ALT = heroModel;
