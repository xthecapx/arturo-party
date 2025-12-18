import type { Locale } from "./config";

// We use dynamic imports to only load the dictionary we need
const dictionaries = {
  en: () => import("@/locales/en.json").then((module) => module.default),
  es: () => import("@/locales/es.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

