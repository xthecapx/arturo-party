// Types for the One Piece party data structure

export interface PartyMeta {
  title: string;
  theme: string;
  subtitle: string;
  totalActivities: number;
  estimatedDuration: string;
  ageRange: string;
}

export interface Character {
  name: string;
  icon: string;
  color?: string;
}

export interface ActivityStep {
  name: string;
  instruction: string;
}

export interface Rule {
  title: string;
  description: string;
}

export interface TrainingMove {
  trigger: string;
  action: string;
}

export interface Training {
  intro: string;
  moves: TrainingMove[];
}

export interface Script {
  intro: string;
  text: string;
}

export interface PuzzleCard {
  number: number;
  image: string;
  letter: string;
}

export interface Puzzle {
  cards: PuzzleCard[];
  solution: string;
}

export interface RhythmLevel {
  level: number;
  name: string;
  pattern: string;
}

export interface Activity {
  id: string;
  title: string;
  type: string;
  typeLabel: string;
  character: Character;
  stationIntro?: string; // Short intro read when kids arrive (max 2 phrases)
  location?: string;
  objective: string;
  description: string;
  materials?: string[];
  instructions?: string[];
  tips?: string[];
  steps?: ActivityStep[];
  rules?: Rule[];
  script?: Script;
  training?: Training;
  puzzle?: Puzzle;
  levels?: RhythmLevel[];
  treasureContents?: string[];
  promptSuggestions?: string[]; // For time capsule / message activities
  shout?: string;
  duration: string;
  difficulty: "easy" | "medium" | "hard";
  minPlayers?: number;
  maxPlayers?: number;
  isFinale?: boolean;
}

export interface Phase {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  islandName: string;
  order: number;
  activities: Activity[];
}

export interface Crew {
  name: string;
  icon: string;
  color: string;
}

export interface CrewConfig {
  description: string;
  teams: Crew[];
  rotationTips: string[];
}

export interface Guest {
  name: string;
  adults: number;
  children: number;
  contact: string;
}

export interface GuestList {
  summary: {
    totalAdults: number;
    totalChildren: number;
  };
  guests: Guest[];
}

export interface Printables {
  needed: string[];
}

export interface PartyData {
  meta: PartyMeta;
  phases: Phase[];
  crews: CrewConfig;
  guestList: GuestList;
  printables: Printables;
}

// Helper type for activity types
export type ActivityType =
  | "arrival"    // Time capsule / welcome activities
  | "waiting"
  | "narrative"
  | "logistics"
  | "cooperative"
  | "balance"
  | "accuracy"
  | "power"
  | "speed"
  | "interactive"
  | "sensory"
  | "puzzle"
  | "teamwork"   // Sharing / collaboration activities
  | "rhythm"
  | "relay"
  | "finale"
  | "reward";

// Map view types for the Grand Line map
export interface MapIsland {
  id: string;
  name: string;
  icon: string;
  color: string;
  position: { x: number; y: number };
  isCompleted: boolean;
  isCurrent: boolean;
  phase: Phase;
}

