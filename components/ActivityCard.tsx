"use client";

import { useState } from "react";
import type { Activity } from "@/lib/types/party";

interface ActivityCardProps {
  activity: Activity;
  activityNumber: number;
  totalActivities: number;
  locale: string;
  phaseColor: string;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  crewIcon?: string;
}

export function ActivityCard({
  activity,
  activityNumber,
  totalActivities,
  locale,
  phaseColor,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  crewIcon,
}: ActivityCardProps) {
  const [showMaterials, setShowMaterials] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const difficultyConfig = {
    easy: { label: locale === "es" ? "Fácil" : "Easy", color: "bg-green-500", icon: "⭐" },
    medium: { label: locale === "es" ? "Medio" : "Medium", color: "bg-yellow-500", icon: "⭐⭐" },
    hard: { label: locale === "es" ? "Difícil" : "Hard", color: "bg-red-500", icon: "⭐⭐⭐" },
  };

  const difficulty = difficultyConfig[activity.difficulty];

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header 
        className="px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: phaseColor }}
      >
        <button 
          onClick={onPrev}
          disabled={!hasPrev}
          className={`p-2 rounded-lg transition-colors ${hasPrev ? "hover:bg-white/20 text-white" : "text-white/30 cursor-not-allowed"}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-white text-sm font-medium flex items-center gap-2">
          {crewIcon && <span>{crewIcon}</span>}
          {activityNumber} / {totalActivities}
        </div>
        <button 
          onClick={onNext}
          disabled={!hasNext}
          className={`p-2 rounded-lg transition-colors ${hasNext ? "hover:bg-white/20 text-white" : "text-white/30 cursor-not-allowed"}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-32">
        {/* Character section */}
        <div className="text-center mb-6">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-full text-5xl mb-3 shadow-xl"
            style={{ backgroundColor: activity.character.color || phaseColor }}
          >
            {activity.character.icon}
          </div>
          <h2 className="text-white/60 text-sm font-medium uppercase tracking-wider">
            {activity.character.name}
          </h2>
        </div>

        {/* Station Intro - READ ALOUD */}
        {activity.stationIntro && (
          <div className="bg-amber-500/20 border-2 border-amber-400/50 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>📢</span>
              {locale === "es" ? "LEER EN VOZ ALTA" : "READ ALOUD"}
            </div>
            <p className="text-white text-lg leading-relaxed font-medium">
              &ldquo;{activity.stationIntro}&rdquo;
            </p>
          </div>
        )}

        {/* Activity title and meta */}
        <div className="mb-6">
          <h1 className="text-white text-2xl font-bold mb-2">
            {activity.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`${difficulty.color} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
              {difficulty.icon} {difficulty.label}
            </span>
            <span className="text-slate-400 text-sm">
              🕐 {activity.duration}
            </span>
            {activity.location && (
              <span className="text-slate-400 text-sm">
                📍 {activity.location}
              </span>
            )}
          </div>
        </div>

        {/* Script section for narrative activities */}
        {activity.script && (
          <div className="bg-slate-800 rounded-2xl p-4 mb-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>📜</span>
              {locale === "es" ? "Guion" : "Script"}
            </h3>
            <div className="text-slate-300 text-sm whitespace-pre-line leading-relaxed">
              {activity.script.text}
            </div>
          </div>
        )}

        {/* Training moves for interactive activities */}
        {activity.training && (
          <div className="bg-orange-500/20 border border-orange-400/30 rounded-2xl p-4 mb-6">
            <h3 className="text-orange-300 font-semibold mb-3 flex items-center gap-2">
              <span>🎯</span>
              {locale === "es" ? "ENSEÑAR PRIMERO" : "TEACH FIRST"}
            </h3>
            <div className="space-y-2">
              {activity.training.moves.map((move, index) => (
                <div key={index} className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3">
                  <span className="text-orange-400 font-bold text-sm flex-shrink-0">
                    {move.trigger}
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="text-white">{move.action}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rhythm levels for Brook's activity */}
        {activity.levels && (
          <div className="bg-purple-500/20 border border-purple-400/30 rounded-2xl p-4 mb-6">
            <h3 className="text-purple-300 font-semibold mb-3 flex items-center gap-2">
              <span>🎵</span>
              {locale === "es" ? "Niveles de Ritmo" : "Rhythm Levels"}
            </h3>
            <div className="space-y-2">
              {activity.levels.map((level) => (
                <div key={level.level} className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-purple-300 text-xs font-semibold mb-1">
                    {locale === "es" ? "Nivel" : "Level"} {level.level}: {level.name}
                  </div>
                  <div className="text-white text-sm">{level.pattern}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Puzzle cards for Robin's activity */}
        {activity.puzzle && (
          <div className="bg-violet-500/20 border border-violet-400/30 rounded-2xl p-4 mb-6">
            <h3 className="text-violet-300 font-semibold mb-3 flex items-center gap-2">
              <span>🧩</span>
              {locale === "es" ? "Tarjetas del Puzzle" : "Puzzle Cards"}
            </h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {activity.puzzle.cards.map((card) => (
                <div key={card.number} className="bg-slate-800/50 rounded-lg p-2 text-center">
                  <div className="text-violet-300 text-xs">#{card.number}</div>
                  <div className="text-white text-sm">{card.image}</div>
                  <div className="text-violet-400 font-bold">{card.letter}</div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <span className="text-violet-300 text-xs">{locale === "es" ? "Solución" : "Solution"}:</span>
              <span className="text-white font-bold ml-2 text-lg">{activity.puzzle.solution}</span>
            </div>
          </div>
        )}

        {/* Steps */}
        {activity.steps && activity.steps.length > 0 && (
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>📋</span>
              {locale === "es" ? "Pasos" : "Steps"}
            </h3>
            <div className="space-y-3">
              {activity.steps.map((step, index) => (
                <div key={index} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-start gap-3">
                    <span className="bg-white/10 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{step.name}</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{step.instruction}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rules for logistics activities */}
        {activity.rules && (
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>📜</span>
              {locale === "es" ? "Reglas" : "Rules"}
            </h3>
            <div className="space-y-2">
              {activity.rules.map((rule, index) => (
                <div key={index} className="bg-slate-800 rounded-xl p-3 border border-slate-700">
                  <h4 className="text-white font-semibold text-sm">{rule.title}</h4>
                  <p className="text-slate-400 text-sm">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        {activity.instructions && activity.instructions.length > 0 && !activity.steps && (
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>📋</span>
              {locale === "es" ? "Instrucciones" : "Instructions"}
            </h3>
            <ul className="space-y-2">
              {activity.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 text-sm">
                  <span className="text-sky-400">•</span>
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Shout / Battle Cry */}
        {activity.shout && (
          <div className="bg-gradient-to-r from-red-500/30 to-orange-500/30 border-2 border-red-400/50 rounded-2xl p-4 mb-6 text-center">
            <div className="text-red-300 text-xs font-semibold uppercase tracking-wider mb-1">
              💪 {locale === "es" ? "GRITO DE BATALLA" : "BATTLE CRY"}
            </div>
            <p className="text-white text-2xl font-bold">
              {activity.shout}
            </p>
          </div>
        )}

        {/* Collapsible: Materials */}
        {activity.materials && activity.materials.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowMaterials(!showMaterials)}
              className="w-full flex items-center justify-between bg-slate-800 rounded-xl p-4 border border-slate-700 hover:bg-slate-700/50 transition-colors"
            >
              <span className="text-white font-medium flex items-center gap-2">
                <span>📦</span>
                {locale === "es" ? "Materiales" : "Materials"}
                <span className="text-slate-400 text-sm">({activity.materials.length})</span>
              </span>
              <svg 
                className={`w-5 h-5 text-slate-400 transition-transform ${showMaterials ? "rotate-180" : ""}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showMaterials && (
              <div className="mt-2 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <ul className="space-y-2">
                  {activity.materials.map((material, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-emerald-400">✓</span>
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Collapsible: Tips */}
        {activity.tips && activity.tips.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowTips(!showTips)}
              className="w-full flex items-center justify-between bg-slate-800 rounded-xl p-4 border border-slate-700 hover:bg-slate-700/50 transition-colors"
            >
              <span className="text-white font-medium flex items-center gap-2">
                <span>💡</span>
                {locale === "es" ? "Consejos" : "Tips"}
              </span>
              <svg 
                className={`w-5 h-5 text-slate-400 transition-transform ${showTips ? "rotate-180" : ""}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showTips && (
              <div className="mt-2 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <ul className="space-y-2">
                  {activity.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-yellow-400">💡</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Treasure contents */}
        {activity.treasureContents && (
          <div className="bg-amber-500/20 border border-amber-400/30 rounded-2xl p-4 mb-6">
            <h3 className="text-amber-300 font-semibold mb-3 flex items-center gap-2">
              <span>🎁</span>
              {locale === "es" ? "Contenido del Cofre" : "Treasure Contents"}
            </h3>
            <ul className="space-y-2">
              {activity.treasureContents.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-white text-sm">
                  <span>💰</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Fixed bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 px-4 py-4 safe-area-pb">
        <div className="max-w-lg mx-auto flex gap-3">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-colors ${
              hasPrev 
                ? "bg-slate-700 hover:bg-slate-600 text-white" 
                : "bg-slate-800 text-slate-600 cursor-not-allowed"
            }`}
          >
            ← {locale === "es" ? "Anterior" : "Previous"}
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-colors ${
              hasNext 
                ? "bg-amber-500 hover:bg-amber-400 text-amber-900" 
                : "bg-emerald-500 hover:bg-emerald-400 text-emerald-900"
            }`}
          >
            {hasNext 
              ? `${locale === "es" ? "Siguiente" : "Next"} →`
              : `🎉 ${locale === "es" ? "¡Completado!" : "Complete!"}`
            }
          </button>
        </div>
      </div>
    </div>
  );
}

