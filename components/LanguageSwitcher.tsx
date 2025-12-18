"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    // Remove current locale from pathname and add new one
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    
    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all tap-target ${
            locale === currentLocale
              ? "bg-white/90 text-gray-800 shadow-md"
              : "bg-white/20 text-white/80 hover:bg-white/30 hover:text-white"
          }`}
          aria-label={`Switch to ${localeNames[locale]}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

