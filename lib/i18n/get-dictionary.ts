import type { Locale } from "./config";

// Main UI dictionaries
const dictionaries = {
  en: () => import("@/locales/en.json").then((module) => module.default),
  es: () => import("@/locales/es.json").then((module) => module.default),
};

// Party-specific dictionaries
const partyDictionaries = {
  "one-piece": {
    en: () => import("@/locales/en/one-piece-party.json").then((module) => module.default),
    es: () => import("@/locales/es/one-piece-party.json").then((module) => module.default),
  },
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export async function getPartyDictionary(locale: Locale, partySlug: keyof typeof partyDictionaries) {
  const partyLoader = partyDictionaries[partySlug];
  if (!partyLoader) {
    throw new Error(`Party dictionary not found for: ${partySlug}`);
  }
  return partyLoader[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
export type PartyDictionary = Awaited<ReturnType<typeof getPartyDictionary>>;
