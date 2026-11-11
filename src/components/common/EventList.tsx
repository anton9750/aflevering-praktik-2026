import styled from 'styled-components'
import type { HistoryEvent } from '../../types/history'
import { useWikiThumbnail } from '../../hooks/useWikiThumbnail'

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
`

const Item = styled.li`
  display: flex;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing(6)};
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const Thumbnail = styled.div<{ $src?: string }>`
  flex: 0 0 240px;
  min-height: 180px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $src }) => ($src ? `url(${$src}) center/cover no-repeat` : theme.colors.background)};

  @media (max-width: 640px) {
    flex-basis: auto;
    width: 100%;
    height: 200px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};
`

const Year = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
`

const Text = styled.p`
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`

function stripYearPrefix(text: string, year: string) {
  return text.replace(new RegExp(`^${year}\\s*[-–]\\s*`), '')
}

function EventCard({ event }: { event: HistoryEvent }) {
  const linkTitle = event.links[0]?.title ?? null
  const { thumbnailUrl } = useWikiThumbnail(linkTitle)

  return (
    <Item>
      <Thumbnail $src={thumbnailUrl} />
      <Content>
        <Year>{event.year}</Year>
        <Text>{stripYearPrefix(event.text, event.year)}</Text>
      </Content>
    </Item>
  )
}

export function EventList({ events }: { events: HistoryEvent[] }) {
  if (events.length === 0) {
    return <p>Ingen begivenheder fundet.</p>
  }

  return (
    <List>
      {events.map((event, index) => (
        <EventCard key={`${event.year}-${index}`} event={event} />
      ))}
    </List>
  )
}
