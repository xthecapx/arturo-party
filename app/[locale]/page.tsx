import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { type Locale } from "@/lib/i18n/config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  // Parse the description to highlight Arturo's name
  const aboutDescription = dict.home.about.description
    .replace("<name>", "")
    .replace("</name>", "");
  const nameStart = dict.home.about.description.indexOf("<name>") >= 0 
    ? dict.home.about.description.indexOf("<name>") 
    : 0;
  const nameEnd = dict.home.about.description.indexOf("</name>");
  const beforeName = dict.home.about.description.substring(0, nameStart);
  const name = dict.home.about.description.substring(nameStart + 6, nameEnd);
  const afterName = dict.home.about.description.substring(nameEnd + 7);

  return (
    <main className="min-h-dvh bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      {/* Language switcher */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-gradient-to-r from-orange-400 to-rose-400 rounded-full p-0.5">
          <LanguageSwitcher currentLocale={locale as Locale} />
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-yellow-200/40 to-orange-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-amber-200/40 to-yellow-200/40 rounded-full blur-2xl" />
        
        {/* Floating decorations */}
        <span className="absolute top-20 left-8 text-4xl animate-float">🎈</span>
        <span className="absolute top-32 right-12 text-3xl animate-float delay-200">⭐</span>
        <span className="absolute bottom-40 left-16 text-3xl animate-float delay-400">🎉</span>
        <span className="absolute bottom-60 right-8 text-4xl animate-float delay-300">🎊</span>
        <span className="absolute top-1/2 left-4 text-2xl animate-float delay-500">✨</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-5 py-8 md:py-16 max-w-4xl mx-auto">
        {/* Hero section */}
        <header className="text-center mb-12 md:mb-20 animate-fade-in pt-8">
          <div className="inline-block mb-4">
            <span className="text-6xl md:text-8xl block mb-2">👶</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 mb-4 tracking-tight">
            {dict.home.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
            {dict.home.hero.subtitle}
          </p>
        </header>

        {/* Party cards grid */}
        <section className="space-y-5 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
          {/* One Piece Party Card */}
          <Link href={`/${locale}/parties/one-piece`} className="block group">
            <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-1 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 animate-fade-in delay-200">
              <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-[22px] p-6 md:p-8 h-full">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl md:text-6xl">🏴‍☠️</span>
                  <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    {dict.parties.onePiece.badge}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {dict.parties.onePiece.title}
                </h2>
                <p className="text-blue-700/80 text-sm md:text-base mb-4">
                  {dict.parties.onePiece.subtitle}
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-800 transition-colors">
                  <span>{dict.parties.onePiece.cta}</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          </Link>

          {/* Coming Soon Card */}
          <Link href={`/${locale}/parties/coming-soon`} className="block group">
            <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 p-1 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 animate-fade-in delay-400">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-[22px] p-6 md:p-8 h-full">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl md:text-6xl">🎁</span>
                  <span className="bg-gradient-to-r from-gray-400 to-gray-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    {dict.parties.comingSoon.badge}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2 group-hover:text-gray-600 transition-colors">
                  {dict.parties.comingSoon.title}
                </h2>
                <p className="text-gray-500 text-sm md:text-base mb-4">
                  {dict.parties.comingSoon.subtitle}
                </p>
                <div className="flex items-center text-gray-500 font-medium text-sm group-hover:text-gray-700 transition-colors">
                  <span>{dict.parties.comingSoon.cta}</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          </Link>
        </section>

        {/* About Arturo section */}
        <section className="mt-12 md:mt-20 text-center animate-fade-in delay-600">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-lg border border-white/50">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {dict.home.about.title}
            </h2>
            <div className="flex justify-center gap-3 mb-6">
              <span className="text-2xl">🌟</span>
              <span className="text-2xl">👑</span>
              <span className="text-2xl">🌟</span>
            </div>
            <p className="text-gray-600 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
              <span className="font-semibold text-orange-600">{name}</span>
              {afterName}
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center animate-fade-in delay-800">
          <p className="text-gray-400 text-sm">
            {dict.home.footer}
          </p>
        </footer>
      </div>
    </main>
  );
}

