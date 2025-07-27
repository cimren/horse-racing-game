import type { GameState } from './interfaces'

export const MAX_HORSES_PER_RACE = 10

export const horseData = [
  { id: 1, name: 'Thunderbolt', condition: 45, color: 'red' },
  { id: 2, name: 'Lightning', condition: 50, color: 'yellow' },
  { id: 3, name: 'Shadow', condition: 48, color: 'blue' },
  { id: 4, name: 'Blaze', condition: 52, color: 'green' },
  { id: 5, name: 'Storm', condition: 47, color: 'black' },
  { id: 6, name: 'Comet', condition: 49, color: 'white' },
  { id: 7, name: 'Echo', condition: 51, color: 'gray' },
  { id: 8, name: 'Nova', condition: 46, color: 'purple' },
  { id: 9, name: 'Zephyr', condition: 53, color: 'orange' },
  { id: 10, name: 'Vortex', condition: 44, color: 'pink' },
  { id: 11, name: 'Cinder', condition: 50, color: 'brown' },
  { id: 12, name: 'Fury', condition: 55, color: 'gold' },
  { id: 13, name: 'Rogue', condition: 54, color: 'silver' },
  { id: 14, name: 'Phantom', condition: 56, color: 'darkcyan' },
  { id: 15, name: 'Blizzard', condition: 57, color: 'cyan' },
  { id: 16, name: 'Inferno', condition: 58, color: 'greenyellow' },
  { id: 17, name: 'Tempest', condition: 59, color: 'midnightblue' },
  { id: 18, name: 'Abyss', condition: 60, color: 'darkred' },
  { id: 19, name: 'Radiant', condition: 61, color: 'deeppink' },
  { id: 20, name: 'Titan', condition: 62, color: 'saddlebrown' },
]

export const GameStates: Record<string, GameState> = {
  INITIAL: 'INITIAL',
  RACE_SCHEDULED: 'RACE_SCHEDULED',
  RACE_STARTED: 'RACE_STARTED',
  RACE_PAUSED: 'RACE_PAUSED',
  ROUND_FINISHED: 'ROUND_FINISHED',
  RACE_FINISHED: 'RACE_FINISHED',
}
