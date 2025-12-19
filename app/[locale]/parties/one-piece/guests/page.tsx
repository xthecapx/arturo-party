import Link from "next/link";
import { getPartyDictionary } from "@/lib/i18n/get-dictionary";
import { type Locale, locales } from "@/lib/i18n/config";
import type { PartyData } from "@/lib/types/party";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function GuestsPage({ params }: Props) {
  const { locale } = await params;
  const party = await getPartyDictionary(locale as Locale, "one-piece") as PartyData;

  const { guests, summary } = party.guestList;

  return (
    <main className="min-h-dvh bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-800 px-4 py-4 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Link 
            href={`/${locale}/parties/one-piece`}
            className="p-2 -ml-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-white text-xl font-bold">
            👥 {locale === "es" ? "Lista de Invitados" : "Guest List"}
          </h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-sky-500/20 border border-sky-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-sky-400">{summary.totalChildren}</div>
            <div className="text-sky-300 text-sm">{locale === "es" ? "Niños" : "Children"}</div>
          </div>
          <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">{summary.totalAdults}</div>
            <div className="text-purple-300 text-sm">{locale === "es" ? "Adultos" : "Adults"}</div>
          </div>
        </div>

        {/* Guest list */}
        <div className="space-y-3">
          {guests.map((guest, index) => (
            <div key={index} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">{guest.name}</h3>
                  {guest.contact && (
                    <p className="text-slate-400 text-sm">{locale === "es" ? "Contacto" : "Contact"}: {guest.contact}</p>
                  )}
                </div>
                <div className="flex gap-3 text-sm">
                  {guest.children > 0 && (
                    <span className="bg-sky-500/20 text-sky-400 px-2 py-1 rounded">
                      👶 {guest.children}
                    </span>
                  )}
                  {guest.adults > 0 && (
                    <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                      👤 {guest.adults}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">
            {summary.totalChildren + summary.totalAdults}
          </div>
          <div className="text-amber-300 text-sm">
            {locale === "es" ? "Total de invitados" : "Total guests"}
          </div>
        </div>
      </div>
    </main>
  );
}

