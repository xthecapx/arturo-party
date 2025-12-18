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
    title: dict.comingSoonPage.meta.title,
    description: dict.comingSoonPage.meta.description,
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ComingSoonPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.comingSoonPage;

  return (
    <main className="min-h-dvh relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Language switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher currentLocale={locale as Locale} />
      </div>

      {/* Starfield background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 animate-twinkle"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, white, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
              radial-gradient(1px 1px at 90px 40px, white, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.9), rgba(0,0,0,0)),
              radial-gradient(1px 1px at 230px 80px, white, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 300px 150px, rgba(255,255,255,0.7), rgba(0,0,0,0)),
              radial-gradient(1px 1px at 50px 160px, white, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 120px 200px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
              radial-gradient(1px 1px at 200px 250px, white, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 280px 220px, rgba(255,255,255,0.6), rgba(0,0,0,0))
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "350px 300px"
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      </div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-20 left-[10%] text-xl animate-float opacity-60">✨</span>
        <span className="absolute top-32 right-[15%] text-lg animate-float delay-200 opacity-50">⭐</span>
        <span className="absolute top-48 left-[25%] text-sm animate-float delay-400 opacity-40">✨</span>
        <span className="absolute top-24 right-[30%] text-xl animate-float delay-100 opacity-60">💫</span>
        <span className="absolute top-60 right-[20%] text-lg animate-float delay-300 opacity-50">⭐</span>
        <span className="absolute bottom-40 left-[20%] text-xl animate-float delay-500 opacity-60">✨</span>
        <span className="absolute bottom-60 right-[25%] text-sm animate-float delay-600 opacity-40">⭐</span>
        <span className="absolute top-1/3 left-[5%] text-lg animate-float delay-700 opacity-50">💫</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-5 py-8 min-h-dvh flex flex-col max-w-2xl mx-auto">
        {/* Back button */}
        <Link href={`/${locale}`} className="inline-flex items-center text-purple-300 hover:text-white transition-colors mb-8 tap-target self-start">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">{t.backButton}</span>
        </Link>

        {/* Centered content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center -mt-16">
          {/* Animated gift box */}
          <div className="relative mb-8 animate-fade-in">
            <div className="w-32 h-32 md:w-40 md:h-40 relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl blur-xl opacity-50 animate-pulse-glow" />
              {/* Gift box */}
              <div className="relative w-full h-full bg-gradient-to-br from-purple-500 via-violet-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl border border-purple-400/30">
                <span className="text-6xl md:text-7xl">🎁</span>
              </div>
            </div>
            {/* Question marks floating around */}
            <span className="absolute -top-4 -left-4 text-2xl text-purple-300 animate-float">?</span>
            <span className="absolute -top-2 -right-6 text-3xl text-pink-300 animate-float delay-200">?</span>
            <span className="absolute -bottom-4 -right-2 text-2xl text-violet-300 animate-float delay-400">?</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 mb-4 animate-fade-in delay-100">
            {t.title}
          </h1>
          
          <p className="text-purple-200/80 text-lg md:text-xl max-w-md mb-8 animate-fade-in delay-200">
            {t.subtitle}
          </p>

          {/* Mystery teaser */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 max-w-md animate-fade-in delay-300">
            <div className="flex justify-center gap-4 mb-4">
              <span className="text-2xl">🎂</span>
              <span className="text-2xl">🎈</span>
              <span className="text-2xl">🎉</span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-3">
              {t.mystery.title}
            </h2>
            <p className="text-purple-200/70 text-sm leading-relaxed">
              {t.mystery.description}
            </p>
          </div>

          {/* Stay tuned */}
          <div className="mt-8 flex gap-3 animate-fade-in delay-400">
            <span className="text-2xl">🌟</span>
            <span className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-200 font-medium">
              {t.stayTuned}
            </span>
            <span className="text-2xl">🌟</span>
          </div>
        </div>

        {/* Footer hint */}
        <footer className="text-center animate-fade-in delay-500">
          <p className="text-purple-400/50 text-sm">
            {t.footer}
          </p>
        </footer>
      </div>
    </main>
  );
}

