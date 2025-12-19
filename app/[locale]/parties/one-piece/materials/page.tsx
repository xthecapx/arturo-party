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

export default async function MaterialsPage({ params }: Props) {
  const { locale } = await params;
  const party = await getPartyDictionary(locale as Locale, "one-piece") as PartyData;

  // Collect all unique materials from all activities
  const allMaterials = new Map<string, string[]>();
  
  for (const phase of party.phases) {
    for (const activity of phase.activities) {
      if (activity.materials) {
        for (const material of activity.materials) {
          if (!allMaterials.has(material)) {
            allMaterials.set(material, []);
          }
          allMaterials.get(material)!.push(activity.title);
        }
      }
    }
  }

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
            📦 {locale === "es" ? "Lista de Materiales" : "Materials List"}
          </h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Printables section */}
        <section className="mb-8">
          <h2 className="text-amber-400 font-semibold text-lg mb-3 flex items-center gap-2">
            <span>🖨️</span>
            {locale === "es" ? "Imprimibles" : "Printables"}
          </h2>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <ul className="space-y-2">
              {party.printables.needed.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded accent-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* All materials */}
        <section>
          <h2 className="text-emerald-400 font-semibold text-lg mb-3 flex items-center gap-2">
            <span>📋</span>
            {locale === "es" ? "Todos los Materiales" : "All Materials"}
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            {locale === "es" 
              ? `${allMaterials.size} materiales únicos necesarios`
              : `${allMaterials.size} unique materials needed`
            }
          </p>
          <div className="space-y-2">
            {Array.from(allMaterials.entries()).map(([material, activities], index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded accent-emerald-500" />
                  <div className="flex-1">
                    <p className="text-white">{material}</p>
                    <p className="text-slate-500 text-xs mt-1">
                      {locale === "es" ? "Usado en" : "Used in"}: {activities.slice(0, 2).join(", ")}
                      {activities.length > 2 && ` +${activities.length - 2}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

