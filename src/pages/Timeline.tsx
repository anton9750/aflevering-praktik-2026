import { useState } from 'react'
import styled from 'styled-components'
import { useFetch } from '../hooks/useFetch'
import { EventList } from '../components/common/EventList'
import type { HistoryData } from '../types/history'

const TODAY_URL = 'https://history.muffinlabs.com/date'

type Tab = 'today' | 'since' | 'bydate'

const TabBar = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin: ${({ theme }) => theme.spacing(6)} 0;
  flex-wrap: wrap;
`

const TabButton = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.primaryText : theme.colors.text)};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(5)};
  font-weight: 600;
  cursor: pointer;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};

  label {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
    font-weight: 600;
  }

  input {
    padding: ${({ theme }) => theme.spacing(2)};
    border-radius: ${({ theme }) => theme.radii.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`

function todayAsInputValue() {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${today.getFullYear()}-${month}-${day}`
}

export function Timeline() {
  const [tab, setTab] = useState<Tab>('today')
  const [sinceYear, setSinceYear] = useState(1950)
  const [dateValue, setDateValue] = useState(todayAsInputValue)

  const { data: todayData, loading: todayLoading, error: todayError } = useFetch<HistoryData>(TODAY_URL)

  const [, month, day] = dateValue.split('-').map(Number)
  const byDateUrl = tab === 'bydate' ? `https://history.muffinlabs.com/date/${month}/${day}` : ''
  const { data: byDateData, loading: byDateLoading, error: byDateError } = useFetch<HistoryData>(byDateUrl)

  const sinceEvents = todayData ? todayData.data.Events.filter((event) => Number(event.year) >= sinceYear) : []

  return (
    <section>
      <h1>Tidslinje</h1>
      <p>Udforsk historiske begivenheder - i dag, siden et bestemt år, eller på en bestemt dato.</p>

      <TabBar>
        <TabButton type="button" $active={tab === 'today'} onClick={() => setTab('today')}>
          I dag
        </TabButton>
        <TabButton type="button" $active={tab === 'since'} onClick={() => setTab('since')}>
          Siden
        </TabButton>
        <TabButton type="button" $active={tab === 'bydate'} onClick={() => setTab('bydate')}>
          På dato
        </TabButton>
      </TabBar>

      {tab === 'today' && (
        <>
          {todayLoading && <p>Indlæser...</p>}
          {todayError && <p>Noget gik galt: {todayError}</p>}
          {todayData && <EventList events={todayData.data.Events} />}
        </>
      )}

      {tab === 'since' && (
        <>
          <Controls>
            <label>
              År:
              <input
                type="number"
                value={sinceYear}
                onChange={(event) => setSinceYear(Number(event.target.value))}
              />
            </label>
          </Controls>
          {todayLoading && <p>Indlæser...</p>}
          {todayError && <p>Noget gik galt: {todayError}</p>}
          {todayData && <EventList events={sinceEvents} />}
        </>
      )}

      {tab === 'bydate' && (
        <>
          <Controls>
            <label>
              Dato:
              <input type="date" value={dateValue} onChange={(event) => setDateValue(event.target.value)} />
            </label>
          </Controls>
          {byDateLoading && <p>Indlæser...</p>}
          {byDateError && <p>Noget gik galt: {byDateError}</p>}
          {byDateData && <EventList events={byDateData.data.Events} />}
        </>
      )}
    </section>
  )
}
