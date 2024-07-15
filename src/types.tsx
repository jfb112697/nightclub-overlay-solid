import { Pronouns } from "./enums";
export interface Character {
  name: string;
  url?: string;
  path: string;
}

export interface Player {
  name: string;
  character?: string | null;
  realCharacter?: Character | null;
  sponsor: string | null;
  score: number;
  h2hWins: number;
  pronouns: Pronouns;
}

export interface LowerThird {
  LeftAnnotationText: string;
  Text1: string;
  Text2: string | null;
  TitleText: string | null;
  ClockText: string | null;
  Music: string | null;
  Compact: boolean;
  Commentary: boolean;
}

export interface Smashgg {
  slug: string | null;
  streamQueue: string | null;
}

export interface Settings {
  ggToken: string;
  ggTournamentSlug: string;
  port: number;
}

export interface Commentator {
  name: string;
  twitter: string;
  pronouns?: Pronouns;
}
export interface Scoreboard {
  players: Player[];
  Player1: Player;
  Player2: Player;
  round: string | null;
  bracket: string | null;
  bestof: string | null;
  tournamentName: string | null;
  Commentators: Commentator[];
  BreakRow1: string | null;
  BreakRow2: string | null;
  BreakRow3: string | null;
  countdown: string | null;
  Smashgg: Smashgg;
  lowerThird: LowerThird;
  settings: Settings;
  predictions: {
    isActive: boolean;
    event: {
      title: string;
    };
    outcomes: [
      {
        channel_points: number;
        title: string;
      }
    ];
  };
}
export const DEFAULT_PLAYER: Player = {
  name: "No Data",
  character: null,
  realCharacter: null,
  sponsor: null,
  score: 0,
  h2hWins: 0,
  pronouns: Pronouns.HeHim,
};

export const DEFAULT_SCOREBOARD: Scoreboard = {
  players: [DEFAULT_PLAYER, DEFAULT_PLAYER],
  Player1: DEFAULT_PLAYER,
  Player2: DEFAULT_PLAYER,
  round: null,
  bracket: null,
  bestof: null,
  tournamentName: null,
  Commentators: [],
  BreakRow1: null,
  BreakRow2: null,
  BreakRow3: null,
  countdown: null,
  Smashgg: { slug: null, streamQueue: null },
  lowerThird: {
    LeftAnnotationText: "",
    Text1: "",
    Text2: null,
    TitleText: null,
    ClockText: null,
    Music: null,
    Compact: false,
    Commentary: false,
  },
  settings: { ggToken: "", ggTournamentSlug: "", port: 80 },
  predictions: {
    isActive: false,
    event: {
      title: "",
    },
    outcomes: [
      {
        channel_points: 0,
        title: "",
      },
    ],
  },
};
