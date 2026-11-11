import { useWikiSummaries } from './useWikiSummaries'

const ERA_TITLES = ['Pangæa', 'Istid', 'Den moderne tid']

export function useEras() {
  return useWikiSummaries(ERA_TITLES)
}
