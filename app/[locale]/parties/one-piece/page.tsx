import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { type Locale, locales } from "@/lib/i18n/config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  
  return {
    title: dict.onePiecePage.meta.title,
    description: dict.onePiecePage.meta.description,
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OnePiecePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.onePiecePage;

  return (
    <main className="min-h-dvh relative overflow-hidden" style={{
      background: "linear-gradient(180deg, #0c4a6e 0%, #0369a1 30%, #0ea5e9 70%, #7dd3fc 100%)"
    }}>
      {/* Language switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher currentLocale={locale as Locale} />
      </div>

      {/* Animated ocean waves */}
      <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
        <div className="absolute bottom-0 w-[200%] h-24 animate-wave" style={{
          background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath fill='%23075985' d='M0,60 C200,100 400,0 600,60 C800,120 1000,20 1200,60 L1200,120 L0,120 Z'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat-x",
          backgroundSize: "600px 100%"
        }} />
        <div className="absolute bottom-0 w-[200%] h-20 animate-wave delay-200" style={{
          background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath fill='%230c4a6e' d='M0,60 C200,100 400,0 600,60 C800,120 1000,20 1200,60 L1200,120 L0,120 Z'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat-x",
          backgroundSize: "500px 100%",
          opacity: 0.8
        }} />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-16 left-6 text-4xl md:text-5xl animate-float">⚓</span>
        <span className="absolute top-28 right-8 text-3xl md:text-4xl animate-float delay-300">🏴‍☠️</span>
        <span className="absolute top-48 left-1/4 text-2xl animate-float delay-500">⭐</span>
        <span className="absolute top-20 right-1/4 text-3xl animate-float delay-200">🗺️</span>
        <span className="absolute top-1/3 right-6 text-2xl animate-float delay-400">💎</span>
        <span className="absolute bottom-48 left-8 text-3xl animate-float delay-100">🦜</span>
        <span className="absolute top-1/2 left-4 text-2xl animate-float delay-600">⚔️</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-5 py-8 pb-48 max-w-2xl mx-auto">
        {/* Back button */}
        <Link href={`/${locale}`} className="inline-flex items-center text-sky-100 hover:text-white transition-colors mb-8 tap-target">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">{t.backButton}</span>
        </Link>

        {/* Hero section */}
        <header className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-2xl mb-6 relative">
            <span className="text-5xl md:text-6xl">👒</span>
            <div className="absolute -bottom-2 -right-2 bg-red-500 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-xl md:text-2xl shadow-lg border-2 border-white">
              1
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg tracking-tight">
            {t.hero.title}
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-300 mb-4 drop-shadow-md">
            {t.hero.subtitle}
          </h2>
          <p className="text-sky-100 text-lg md:text-xl max-w-md mx-auto">
            {t.hero.description}
          </p>
        </header>

        {/* Party info card */}
        <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl mb-6 animate-fade-in delay-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📅</span>
            <h3 className="text-2xl font-bold text-blue-900">{t.details.title}</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📍</span>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">{t.details.location.label}</h4>
                <p className="text-gray-600 text-sm">{t.details.location.value}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🕐</span>
              </div>
              <div>
                <h4 className="font-semibold text-amber-900">{t.details.time.label}</h4>
                <p className="text-gray-600 text-sm">{t.details.time.value}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">👔</span>
              </div>
              <div>
                <h4 className="font-semibold text-rose-900">{t.details.dressCode.label}</h4>
                <p className="text-gray-600 text-sm">{t.details.dressCode.value}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Treasure theme card */}
        <section className="bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 rounded-3xl p-6 md:p-8 shadow-2xl mb-6 animate-fade-in delay-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl" />
          <div className="relative">
            <div className="text-center mb-4">
              <span className="text-5xl">💰</span>
            </div>
            <h3 className="text-2xl font-bold text-amber-900 text-center mb-3">
              {t.treasure.title}
            </h3>
            <p className="text-amber-800 text-center text-sm md:text-base">
              {t.treasure.description}
            </p>
          </div>
        </section>

        {/* Fun facts */}
        <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in delay-400">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            {t.firstYear.title}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl">
              <span className="text-3xl block mb-2">🎂</span>
              <p className="text-sm font-semibold text-blue-900">{t.firstYear.birthday}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl">
              <span className="text-3xl block mb-2">⭐</span>
              <p className="text-sm font-semibold text-amber-900">{t.firstYear.dreams}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl">
              <span className="text-3xl block mb-2">❤️</span>
              <p className="text-sm font-semibold text-rose-900">{t.firstYear.love}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl">
              <span className="text-3xl block mb-2">🌈</span>
              <p className="text-sm font-semibold text-emerald-900">{t.firstYear.future}</p>
            </div>
          </div>
        </section>

        {/* Crew message */}
        <section className="mt-8 text-center animate-fade-in delay-500">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
            <span>👒</span>
            <span className="font-medium text-sm">{t.crewMessage}</span>
            <span>⚓</span>
          </div>
        </section>
      </div>
    </main>
  );
}

