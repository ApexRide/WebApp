import type { Locale } from "@/i18n/config";

// The cities/airports served. Names are localised; coordinates drive the
// distance-based fare estimate. To add a destination, add a row here.
export interface City {
  id: string;
  lat: number;
  lng: number;
  names: Record<Locale, string>;
}

export const cities: City[] = [
  { id: "london", lat: 51.5072, lng: -0.1276, names: { en: "London", fr: "Londres", de: "London", ar: "لندن" } },
  { id: "heathrow", lat: 51.47, lng: -0.4543, names: { en: "Heathrow Airport", fr: "Aéroport d’Heathrow", de: "Flughafen Heathrow", ar: "مطار هيثرو" } },
  { id: "gatwick", lat: 51.1537, lng: -0.1821, names: { en: "Gatwick Airport", fr: "Aéroport de Gatwick", de: "Flughafen Gatwick", ar: "مطار غاتويك" } },
  { id: "manchester", lat: 53.4808, lng: -2.2426, names: { en: "Manchester", fr: "Manchester", de: "Manchester", ar: "مانشستر" } },
  { id: "birmingham", lat: 52.4862, lng: -1.8904, names: { en: "Birmingham", fr: "Birmingham", de: "Birmingham", ar: "برمنغهام" } },
  { id: "leeds", lat: 53.8008, lng: -1.5491, names: { en: "Leeds", fr: "Leeds", de: "Leeds", ar: "ليدز" } },
  { id: "liverpool", lat: 53.4084, lng: -2.9916, names: { en: "Liverpool", fr: "Liverpool", de: "Liverpool", ar: "ليفربول" } },
  { id: "bristol", lat: 51.4545, lng: -2.5879, names: { en: "Bristol", fr: "Bristol", de: "Bristol", ar: "بريستول" } },
  { id: "sheffield", lat: 53.3811, lng: -1.4701, names: { en: "Sheffield", fr: "Sheffield", de: "Sheffield", ar: "شيفيلد" } },
  { id: "newcastle", lat: 54.9783, lng: -1.6178, names: { en: "Newcastle", fr: "Newcastle", de: "Newcastle", ar: "نيوكاسل" } },
  { id: "edinburgh", lat: 55.9533, lng: -3.1883, names: { en: "Edinburgh", fr: "Édimbourg", de: "Edinburgh", ar: "إدنبرة" } },
  { id: "glasgow", lat: 55.8642, lng: -4.2518, names: { en: "Glasgow", fr: "Glasgow", de: "Glasgow", ar: "غلاسكو" } },
  { id: "oxford", lat: 51.752, lng: -1.2577, names: { en: "Oxford", fr: "Oxford", de: "Oxford", ar: "أكسفورد" } },
  { id: "cambridge", lat: 52.2053, lng: 0.1218, names: { en: "Cambridge", fr: "Cambridge", de: "Cambridge", ar: "كامبريدج" } },
];

export function cityName(city: City, locale: Locale): string {
  return city.names[locale] ?? city.names.en;
}

export function findCity(id: string): City | undefined {
  return cities.find((c) => c.id === id);
}
