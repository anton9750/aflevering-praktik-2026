import { useState, type FormEvent } from 'react'
import styled from 'styled-components'
import { useWikiSuggestions } from '../hooks/useWikiSuggestions'
import { fetchWikiSummary, type WikiSummary } from '../services/wikipedia'

const SearchForm = styled.form`
  position: relative;
  max-width: 480px;
  margin: ${({ theme }) => theme.spacing(6)} 0;
`

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  font-size: 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`

const SuggestionsList = styled.ul`
  position: absolute;
  z-index: 2;
  top: 100%;
  left: 0;
  right: 0;
  margin: ${({ theme }) => theme.spacing(1)} 0 0;
  padding: 0;
  list-style: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
`

const SuggestionItem = styled.li`
  button {
    display: block;
    width: 100%;
    text-align: left;
    padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.text};
    font: inherit;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.background};
    }
  }
`

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${({ theme }) => theme.spacing(5)};
  margin-top: ${({ theme }) => theme.spacing(6)};
`

const ResultCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
`

const ResultImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`

const ResultBody = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
`

const ResultTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing(2)};
`

const ResultExtract = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.925rem;
  line-height: 1.6;
`

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.accent};
`

const Page = styled.section`
  min-height: 70vh;
`

export function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<WikiSummary[]>([])
  const [error, setError] = useState<string | null>(null)
  const { suggestions } = useWikiSuggestions(query)

  async function addResult(title: string) {
    setQuery('')
    setError(null)

    try {
      const summary = await fetchWikiSummary(title)
      setResults((previous) => [summary, ...previous])
    } catch {
      setError(`Kunne ikke finde noget om "${title}".`)
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (query.trim()) {
      addResult(query.trim())
    }
  }

  return (
    <Page>
      <h1>Søg</h1>
      <p>Søg efter begivenheder, personer eller emner - forslagene kommer direkte fra Wikipedia.</p>

      <SearchForm onSubmit={handleSubmit}>
        <Input
          type="search"
          value={query}
          placeholder="Søg, fx &quot;anden&quot;..."
          onChange={(event) => setQuery(event.target.value)}
        />
        {suggestions.length > 0 && (
          <SuggestionsList>
            {suggestions.map((title) => (
              <SuggestionItem key={title}>
                <button type="button" onMouseDown={() => addResult(title)}>
                  {title}
                </button>
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )}
      </SearchForm>

      {error && <ErrorText>{error}</ErrorText>}

      <ResultsGrid>
        {results.map((result) => (
          <ResultCard key={`${result.title}-${result.displayTitle}`}>
            {result.thumbnailUrl && <ResultImage src={result.thumbnailUrl} alt={result.displayTitle} />}
            <ResultBody>
              <ResultTitle>{result.displayTitle}</ResultTitle>
              <ResultExtract>{result.extract}</ResultExtract>
            </ResultBody>
          </ResultCard>
        ))}
      </ResultsGrid>
    </Page>
  )
}
