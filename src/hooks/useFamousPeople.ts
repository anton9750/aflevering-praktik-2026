import { useWikiSummaries } from './useWikiSummaries'

const PEOPLE_TITLES = [
  'Julius Cæsar',
  'Napoleon',
  'Kleopatra',
  'Albert Einstein',
  'Leonardo da Vinci',
  'Mahatma Gandhi',
  'Winston Churchill',
  'Martin Luther King',
  'Nelson Mandela',
  'Marie Curie',
]

export function useFamousPeople() {
  return useWikiSummaries(PEOPLE_TITLES)
}
