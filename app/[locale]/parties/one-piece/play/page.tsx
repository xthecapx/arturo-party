"use client";

import { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ActivityCard } from "@/components/ActivityCard";
import type { PartyData, Activity, Phase } from "@/lib/types/party";

type CrewType = "straw-hat" | "heart-pirates";

const CREW_CONFIG = {
  "straw-hat": {
    name: "Straw Hat",
    icon: "👒",
    color: "#dc2626",
    storageKey: "arturo-party-one-piece-straw-hat"
  },
  "heart-pirates": {
    name: "Heart Pirates", 
    icon: "💛",
    color: "#eab308",
    storageKey: "arturo-party-one-piece-heart-pirates"
  }
};

// Flatten activities from all phases into a single array with phase info
interface FlatActivity {
  activity: Activity;
  phase: Phase;
  globalIndex: number;
}

function getOrderedActivities(party: PartyData, crew: CrewType): FlatActivity[] {
  const flat: FlatActivity[] = [];
  let globalIndex = 0;
  
  // Phase 0 (Arrival) - Same order for both crews
  const phase0 = party.phases.find(p => p.id === "phase_0");
  if (phase0) {
    for (const activity of phase0.activities) {
      flat.push({ activity, phase: phase0, globalIndex });
      globalIndex++;
    }
  }
  
  // Phase 1 (Grand Line) - Different order based on crew
  const phase1 = party.phases.find(p => p.id === "phase_1");
  if (phase1) {
    // Separate finale (activity 11) from the rest
    const finaleActivity = phase1.activities.find(a => a.id === "11");
    const mainActivities = phase1.activities.filter(a => a.id !== "11");
    
    // Order main activities based on crew
    const orderedMain = crew === "heart-pirates" 
      ? [...mainActivities].reverse() 
      : mainActivities;
    
    for (const activity of orderedMain) {
      flat.push({ activity, phase: phase1, globalIndex });
      globalIndex++;
    }
    
    // Add finale at the end (same for both crews - they meet here!)
    if (finaleActivity) {
      flat.push({ activity: finaleActivity, phase: phase1, globalIndex });
      globalIndex++;
    }
  }
  
  // Phase 2 (Treasure) - Same order for both crews
  const phase2 = party.phases.find(p => p.id === "phase_2");
  if (phase2) {
    for (const activity of phase2.activities) {
      flat.push({ activity, phase: phase2, globalIndex });
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
  const searchParams = useSearchParams();
  const crewParam = searchParams.get("crew") as CrewType | null;
  const crew: CrewType = crewParam && CREW_CONFIG[crewParam] ? crewParam : "straw-hat";
  const crewConfig = CREW_CONFIG[crew];
  
  const [party, setParty] = useState<PartyData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const t = {
    loading: locale === "es" ? "Cargando aventura..." : "Loading adventure...",
    error: locale === "es" ? "Error cargando los datos" : "Error loading data",
    goBack: locale === "es" ? "Volver" : "Go back",
    complete: locale === "es" ? "¡Aventura Completada!" : "Adventure Complete!",
    foundTreasure: locale === "es" ? "¡Habéis encontrado el One Piece!" : "You found the One Piece!",
    restart: locale === "es" ? "Reiniciar Aventura" : "Restart Adventure",
    backOverview: locale === "es" ? "Volver al Inicio" : "Back to Overview",
    crewMeeting: locale === "es" 
      ? "🎉 ¡Punto de encuentro! ¡Aquí se unen ambas tripulaciones!" 
      : "🎉 Meeting point! Both crews unite here!",
  };

  // Load party data
  useEffect(() => {
    async function loadParty() {
      try {
        const partyData = await import(`@/locales/${locale}/one-piece-party.json`);
        setParty(partyData.default as PartyData);
        
        // Restore progress from localStorage (crew-specific)
        const savedProgress = localStorage.getItem(crewConfig.storageKey);
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
  }, [locale, crewConfig.storageKey]);

  // Save progress to localStorage (crew-specific)
  useEffect(() => {
    if (party && currentIndex >= 0) {
      localStorage.setItem(crewConfig.storageKey, currentIndex.toString());
    }
  }, [currentIndex, party, crewConfig.storageKey]);

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⚓</div>
          <p className="text-white">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (!party) {
    return (
      <div className="min-h-dvh bg-slate-900 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-white mb-4">{t.error}</p>
          <Link 
            href={`/${locale}/parties/one-piece`}
            className="text-sky-400 underline"
          >
            {t.goBack}
          </Link>
        </div>
      </div>
    );
  }

  const orderedActivities = getOrderedActivities(party, crew);
  const totalActivities = orderedActivities.length;
  
  const current = orderedActivities[currentIndex];
  
  // Check if this is the finale activity (where crews meet)
  const isFinaleActivity = current?.activity.id === "11";
  
  if (!current) {
    return (
      <div className="min-h-dvh bg-slate-900 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-6xl mb-4">🎉</div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl">{crewConfig.icon}</span>
          </div>
          <h1 className="text-white text-2xl font-bold mb-2">{t.complete}</h1>
          <p className="text-slate-400 mb-6">{t.foundTreasure}</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                localStorage.removeItem(crewConfig.storageKey);
              }}
              className="block w-full bg-amber-500 hover:bg-amber-400 text-amber-900 font-semibold py-3 px-6 rounded-xl"
            >
              {t.restart}
            </button>
            <Link 
              href={`/${locale}/parties/one-piece`}
              className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-xl text-center"
            >
              {t.backOverview}
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
      {/* Crew indicator banner */}
      <div 
        className="fixed top-0 left-0 right-0 z-40 py-2 px-4 text-center text-sm font-bold"
        style={{ backgroundColor: crewConfig.color }}
      >
        <span className="text-white flex items-center justify-center gap-2">
          <span>{crewConfig.icon}</span>
          {crewConfig.name}
          <span>{crewConfig.icon}</span>
        </span>
      </div>

      {/* Exit button overlay */}
      <Link 
        href={`/${locale}/parties/one-piece`}
        className="fixed top-12 left-4 z-50 bg-slate-800/80 backdrop-blur-sm p-2 rounded-lg hover:bg-slate-700 transition-colors"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Link>

      {/* Meeting point banner for finale */}
      {isFinaleActivity && (
        <div className="fixed top-20 left-4 right-4 z-40 bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl py-3 px-4 text-center animate-pulse-glow">
          <span className="text-white font-bold text-sm">{t.crewMeeting}</span>
        </div>
      )}

      <div className={isFinaleActivity ? "pt-16" : "pt-8"}>
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
          crewIcon={crewConfig.icon}
        />
      </div>
    </>
  );
}
