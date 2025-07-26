export interface TableColumn {
  columnName: string
  label: string
}
export type TableRow = Record<string, string | number>

export type TableSize = 'Default' | 'Small'

export interface HorseData {
  id: number
  name: string
  condition: number
  color: string
}

export interface Round {
  name: string
  distance: number
  horseList: Array<HorseData>
  resultList: Array<HorseData>
}

export type GameState =
  | 'INITIAL'
  | 'RACE_SCHEDULED'
  | 'RACE_STARTED'
  | 'RACE_PAUSED'
  | 'ROUND_FINISHED'
  | 'RACE_FINISHED'
