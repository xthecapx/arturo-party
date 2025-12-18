import type { Metadata, Viewport } from "next";
import { Fredoka, Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import "../globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    return {};
  }
  const dict = await getDictionary(locale as Locale);
  
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#faf8f5",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${fredoka.variable} ${geist.variable} antialiased`}
        style={{ fontFamily: "var(--font-fredoka), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}

