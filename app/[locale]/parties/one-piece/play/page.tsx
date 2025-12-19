"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ActivityCard } from "@/components/ActivityCard";
import type { PartyData, Activity, Phase } from "@/lib/types/party";

// Flatten activities from all phases into a single array with phase info
interface FlatActivity {
  activity: Activity;
  phase: Phase;
  globalIndex: number;
}

function flattenActivities(party: PartyData): FlatActivity[] {
  const flat: FlatActivity[] = [];
  let globalIndex = 0;
  
  for (const phase of party.phases) {
    for (const activity of phase.activities) {
      flat.push({ activity, phase, globalIndex });
      globalIndex++;
    }
  }
  
  return flat;
}

export default function PlayPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = use(params);
  const [party, setParty] = useState<PartyData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load party data
  useEffect(() => {
    async function loadParty() {
      try {
        const partyData = await import(`@/locales/${locale}/one-piece-party.json`);
        setParty(partyData.default as PartyData);
        
        // Restore progress from localStorage
        const savedProgress = localStorage.getItem(`arturo-party-one-piece-progress`);
        if (savedProgress) {
          const progress = parseInt(savedProgress, 10);
          if (!isNaN(progress) && progress >= 0) {
            setCurrentIndex(progress);
          }
        }
      } catch (error) {
        console.error("Failed to load party data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadParty();
  }, [locale]);

  // Save progress to localStorage
  useEffect(() => {
    if (party && currentIndex >= 0) {
      localStorage.setItem(`arturo-party-one-piece-progress`, currentIndex.toString());
    }
  }, [currentIndex, party]);

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⚓</div>
          <p className="text-white">{locale === "es" ? "Cargando aventura..." : "Loading adventure..."}</p>
        </div>
      </div>
    );
  }

  if (!party) {
    return (
      <div className="min-h-dvh bg-slate-900 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-white mb-4">{locale === "es" ? "Error cargando los datos" : "Error loading data"}</p>
          <Link 
            href={`/${locale}/parties/one-piece`}
            className="text-sky-400 underline"
          >
            {locale === "es" ? "Volver" : "Go back"}
          </Link>
        </div>
      </div>
    );
  }

  const flatActivities = flattenActivities(party);
  const totalActivities = flatActivities.length;
  
  const current = flatActivities[currentIndex];
  
  if (!current) {
    return (
      <div className="min-h-dvh bg-slate-900 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-white text-2xl font-bold mb-2">
            {locale === "es" ? "¡Aventura Completada!" : "Adventure Complete!"}
          </h1>
          <p className="text-slate-400 mb-6">
            {locale === "es" 
              ? "¡Habéis encontrado el One Piece!" 
              : "You found the One Piece!"}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                localStorage.removeItem(`arturo-party-one-piece-progress`);
              }}
              className="block w-full bg-amber-500 hover:bg-amber-400 text-amber-900 font-semibold py-3 px-6 rounded-xl"
            >
              {locale === "es" ? "Reiniciar Aventura" : "Restart Adventure"}
            </button>
            <Link 
              href={`/${locale}/parties/one-piece`}
              className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-xl text-center"
            >
              {locale === "es" ? "Volver al Inicio" : "Back to Overview"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < totalActivities - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo(0, 0);
    } else {
      // Show completion
      setCurrentIndex(totalActivities);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {/* Exit button overlay */}
      <Link 
        href={`/${locale}/parties/one-piece`}
        className="fixed top-4 left-4 z-50 bg-slate-800/80 backdrop-blur-sm p-2 rounded-lg hover:bg-slate-700 transition-colors"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Link>

      <ActivityCard
        activity={current.activity}
        activityNumber={currentIndex + 1}
        totalActivities={totalActivities}
        locale={locale}
        phaseColor={current.phase.color}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={currentIndex < totalActivities - 1}
        hasPrev={currentIndex > 0}
      />
    </>
  );
}

