import Link from "next/link";
import type { Metadata } from "next";
import { getPartyDictionary } from "@/lib/i18n/get-dictionary";
import { type Locale, locales } from "@/lib/i18n/config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { PartyData } from "@/lib/types/party";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const party = await getPartyDictionary(locale as Locale, "one-piece") as PartyData;
  
  return {
    title: party.meta.title,
    description: party.meta.subtitle,
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OnePiecePartyPage({ params }: Props) {
  const { locale } = await params;
  const party = await getPartyDictionary(locale as Locale, "one-piece") as PartyData;

  // Count total activities across all phases
  const totalActivities = party.phases.reduce((acc, phase) => acc + phase.activities.length, 0);

  const t = {
    back: locale === "es" ? "Volver" : "Back",
    activities: locale === "es" ? "actividades" : "activities",
    route: locale === "es" ? "Ruta del Grand Line" : "Grand Line Route",
    selectCrew: locale === "es" ? "SELECCIONA TU TRIPULACIÓN" : "SELECT YOUR CREW",
    crewMeet: locale === "es" 
      ? "¡Ambas tripulaciones se encontrarán en la actividad final para formar las siglas AMG!" 
      : "Both crews will meet at the final activity to form the AMG initials!",
    startAs: locale === "es" ? "COMENZAR COMO" : "START AS",
    materials: locale === "es" ? "Materiales" : "Materials",
    guests: locale === "es" ? "Invitados" : "Guests",
    phases: locale === "es" ? "Fases de la Aventura" : "Adventure Phases",
    strawHatRoute: locale === "es" ? "Ruta: 1→2→3→...→10→Final" : "Route: 1→2→3→...→10→Finale",
    heartRoute: locale === "es" ? "Ruta: 10→9→8→...→1→Final" : "Route: 10→9→8→...→1→Finale",
  };

  return (
    <main className="min-h-dvh relative overflow-hidden" style={{
      background: "linear-gradient(180deg, #0c4a6e 0%, #0369a1 30%, #0ea5e9 70%, #7dd3fc 100%)"
    }}>
      {/* Language switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher currentLocale={locale as Locale} />
      </div>

      {/* Animated ocean waves */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 w-[200%] h-20 animate-wave" style={{
          background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath fill='%23075985' d='M0,60 C200,100 400,0 600,60 C800,120 1000,20 1200,60 L1200,120 L0,120 Z'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat-x",
          backgroundSize: "600px 100%"
        }} />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-20 left-6 text-3xl animate-float">⚓</span>
        <span className="absolute top-32 right-8 text-2xl animate-float delay-300">🏴‍☠️</span>
        <span className="absolute top-48 left-1/4 text-xl animate-float delay-500">⭐</span>
        <span className="absolute bottom-40 right-12 text-2xl animate-float delay-200">🗺️</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-5 py-8 pb-40 max-w-lg mx-auto">
        {/* Back button */}
        <Link href={`/${locale}`} className="inline-flex items-center text-sky-100 hover:text-white transition-colors mb-6 tap-target">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">{t.back}</span>
        </Link>

        {/* Hero section */}
        <header className="text-center mb-6 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-2xl mb-4">
            <span className="text-4xl">👒</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            {party.meta.title}
          </h1>
          <p className="text-sky-100 text-sm md:text-base max-w-sm mx-auto">
            {party.meta.subtitle}
          </p>
        </header>

        {/* Stats badges */}
        <div className="flex justify-center gap-3 mb-6 animate-fade-in delay-100">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
            <span className="font-semibold">{totalActivities}</span> {t.activities}
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
            🕐 {party.meta.estimatedDuration}
          </div>
        </div>

        {/* Crew Selection Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 animate-fade-in delay-200">
          <h2 className="text-white font-bold text-center text-lg mb-2 flex items-center justify-center gap-2">
            <span>⚔️</span>
            {t.selectCrew}
            <span>⚔️</span>
          </h2>
          <p className="text-sky-200 text-xs text-center mb-4">
            {t.crewMeet}
          </p>
          
          {/* Crew Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Straw Hat Crew */}
            <Link 
              href={`/${locale}/parties/one-piece/play?crew=straw-hat`}
              className="group"
            >
              <div className="bg-gradient-to-br from-red-500/30 to-red-600/30 hover:from-red-500/50 hover:to-red-600/50 border-2 border-red-500/50 rounded-2xl p-4 text-center transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">👒</div>
                <h3 className="text-white font-bold text-sm mb-1">Straw Hat</h3>
                <p className="text-red-200 text-[10px] mb-3">{t.strawHatRoute}</p>
                <div className="bg-red-500 hover:bg-red-400 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors">
                  {t.startAs} 👒
                </div>
              </div>
            </Link>

            {/* Heart Pirates */}
            <Link 
              href={`/${locale}/parties/one-piece/play?crew=heart-pirates`}
              className="group"
            >
              <div className="bg-gradient-to-br from-yellow-500/30 to-yellow-600/30 hover:from-yellow-500/50 hover:to-yellow-600/50 border-2 border-yellow-500/50 rounded-2xl p-4 text-center transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">💛</div>
                <h3 className="text-white font-bold text-sm mb-1">Heart Pirates</h3>
                <p className="text-yellow-200 text-[10px] mb-3">{t.heartRoute}</p>
                <div className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 text-xs font-bold py-2 px-3 rounded-lg transition-colors">
                  {t.startAs} 💛
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Progress Map Preview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 animate-fade-in delay-300">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <span>🗺️</span>
              {t.route}
            </h2>
          </div>
          
          {/* Phase indicators */}
          <div className="flex items-center gap-2">
            {party.phases.map((phase) => (
              <div key={phase.id} className="flex-1">
                <div 
                  className="h-2 rounded-full"
                  style={{ backgroundColor: phase.color }}
                />
                <p className="text-xs text-sky-200 mt-1 text-center truncate">
                  {phase.icon} {phase.activities.length}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick access buttons */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in delay-400">
          <Link 
            href={`/${locale}/parties/one-piece/materials`}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transition-colors"
          >
            <span className="text-2xl block mb-1">📦</span>
            <span className="text-white text-sm font-medium">{t.materials}</span>
          </Link>
          <Link 
            href={`/${locale}/parties/one-piece/guests`}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transition-colors"
          >
            <span className="text-2xl block mb-1">👥</span>
            <span className="text-white text-sm font-medium">{t.guests}</span>
          </Link>
        </div>

        {/* Phase overview */}
        <div className="mt-8 space-y-4 animate-fade-in delay-500">
          <h2 className="text-white font-semibold text-lg">{t.phases}</h2>
          
          {party.phases.map((phase) => (
            <div 
              key={phase.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-l-4"
              style={{ borderColor: phase.color }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{phase.icon}</span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{phase.name}</h3>
                  <p className="text-sky-200 text-xs">{phase.activities.length} {t.activities}</p>
                </div>
                <span className="text-sky-300 text-sm">{phase.islandName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
