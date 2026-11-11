import { useWikiSummaries } from './useWikiSummaries'

const BATTLE_TITLES = [
  'Napoleonskrigene',
  'Den Franske Revolution',
  'Den Amerikanske Borgerkrig',
  'Anden Verdenskrig',
  'Den Kolde Krig',
]

export function useFamousBattles() {
  return useWikiSummaries(BATTLE_TITLES)
}
