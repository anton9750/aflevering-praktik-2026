import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useFamousPeople } from '../hooks/useFamousPeople'
import { useFamousBattles } from '../hooks/useFamousBattles'
import { useEras } from '../hooks/useEras'

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(10)} 0;
  text-align: center;
`

const Title = styled.h1`
  font-size: 2.75rem;
  margin: 0;
`

const Tagline = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 60ch;
  margin: 0 auto;
`

const HeroActions = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(4)};
  flex-wrap: wrap;
`

const PrimaryButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryText};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
`

const SecondaryButton = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
`

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing(10)} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const SectionHeading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  flex-wrap: wrap;
`

const SectionLink = styled(Link)`
  font-weight: 600;
  white-space: nowrap;
`

const OnThisDayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing(5)};
`

const EventCard = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing(5)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: inherit;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const EventYear = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.accent};
`

const EventTitle = styled.h3`
  margin: ${({ theme }) => theme.spacing(2)} 0;
`

const EventDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.925rem;
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing(5)};
`

const FeatureCard = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: inherit;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const FeatureTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing(2)};
`

const FeatureDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.925rem;
`

const PersonsStrip = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(2)};
`

const PersonSlide = styled(Link)`
  flex: 0 0 auto;
  width: 110px;
  text-align: center;
  color: inherit;
  transform: scale(1);
  opacity: 0.55;
  filter: grayscale(40%);
  transition: transform 0.45s ease, opacity 0.45s ease, filter 0.45s ease;
  z-index: 0;

  &:hover,
  &:focus-visible {
    transform: scale(1.18);
    opacity: 1;
    filter: none;
    z-index: 1;
  }
`

const PersonImageWrap = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto ${({ theme }) => theme.spacing(2)};
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`

const PersonImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PersonName = styled.span`
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
`

const BattleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing(5)};
`

const BattleFigure = styled.figure`
  margin: 0;
`

const BattleImage = styled.div<{ $src?: string }>`
  height: 140px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $src }) => ($src ? `url(${$src}) center/cover no-repeat` : theme.colors.surface)};
`

const BattleCaption = styled.figcaption`
  margin-top: ${({ theme }) => theme.spacing(2)};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`

const EraGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing(5)};
`

const EraFigure = styled.figure`
  margin: 0;
`

const EraImage = styled.div<{ $src?: string }>`
  height: 180px;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $src }) => ($src ? `url(${$src}) center/cover no-repeat` : theme.colors.surface)};
`

const EraCaption = styled.figcaption`
  margin-top: ${({ theme }) => theme.spacing(2)};
  font-weight: 600;
  text-align: center;
`

interface OnThisDayEvent {
  id: string
  year: string
  title: string
  description: string
}

const onThisDayEvents: OnThisDayEvent[] = [
  {
    id: '1',
    year: '1969',
    title: 'Mennesket lander på Månen',
    description: 'Apollo 11 lander som den første bemandede rumfærge på Månen.',
  },
  {
    id: '2',
    year: '1789',
    title: 'Den Franske Revolution begynder',
    description: 'Stormen på Bastillen markerer starten på revolutionen i Frankrig.',
  },
  {
    id: '3',
    year: '1492',
    title: 'Columbus når Amerika',
    description: 'Christopher Columbus’ ekspedition når land i den nye verden.',
  },
]

const features = [
  {
    to: '/tidslinje',
    title: 'Tidslinje',
    description: 'Udforsk begivenheder gennem tiden, filtreret på periode, emne og land.',
  },
  {
    to: '/kort',
    title: 'Verdenskort',
    description: 'Se historiske begivenheder placeret på et interaktivt kort.',
  },
  {
    to: '/sammenlign',
    title: 'Sammenlign perioder',
    description: 'Sæt to perioder side om side og del dit resultat med andre.',
  },
  {
    to: '/quiz',
    title: 'Gæt årstallet',
    description: 'Test din viden i en quiz med point og runder.',
  },
]

export function Home() {
  const { items: people } = useFamousPeople()
  const { items: battles } = useFamousBattles()
  const { items: eras } = useEras()

  return (
    <>
      <Hero>
        <Title>Tidsrejsen</Title>
        <Tagline>
          Udforsk historien på en tidslinje og et kort. Hver side samler
          tekst, billeder og fakta fra åbne kilder som Wikipedia, The Met
          Museum og Open Library.
        </Tagline>
        <HeroActions>
          <PrimaryButton to="/tidslinje">Start på tidslinjen</PrimaryButton>
          <SecondaryButton to="/kort">Udforsk kortet</SecondaryButton>
        </HeroActions>
      </Hero>

      <Section>
        <SectionHeading>
          <h2>På denne dag</h2>
          <SectionLink to="/tidslinje">Se hele tidslinjen →</SectionLink>
        </SectionHeading>
        <OnThisDayGrid>
          {onThisDayEvents.map((event) => (
            <EventCard key={event.id} to={`/begivenhed/${event.id}`}>
              <EventYear>{event.year}</EventYear>
              <EventTitle>{event.title}</EventTitle>
              <EventDescription>{event.description}</EventDescription>
            </EventCard>
          ))}
        </OnThisDayGrid>
      </Section>

      <Section>
        <SectionHeading>
          <h2>Udforsk Tidsrejsen</h2>
        </SectionHeading>
        <FeatureGrid>
          {features.map((feature) => (
            <FeatureCard key={feature.to} to={feature.to}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </Section>

      <Section>
        <SectionHeading>
          <h2>10 kendte personer</h2>
        </SectionHeading>
        <PersonsStrip>
          {people.map((person) => (
            <PersonSlide key={person.title} to={`/person/${encodeURIComponent(person.title)}`}>
              <PersonImageWrap>
                {person.thumbnailUrl && (
                  <PersonImage src={person.thumbnailUrl} alt={person.displayTitle} />
                )}
              </PersonImageWrap>
              <PersonName>{person.displayTitle}</PersonName>
            </PersonSlide>
          ))}
        </PersonsStrip>
      </Section>

      <Section>
        <SectionHeading>
          <h2>5 berømte slag og krige</h2>
        </SectionHeading>
        <BattleGrid>
          {battles.map((battle) => (
            <BattleFigure key={battle.title}>
              <BattleImage $src={battle.thumbnailUrl} />
              <BattleCaption>{battle.displayTitle}</BattleCaption>
            </BattleFigure>
          ))}
        </BattleGrid>
      </Section>

      <Section>
        <SectionHeading>
          <h2>Tidsaldre</h2>
        </SectionHeading>
        <EraGrid>
          {eras.map((era) => (
            <EraFigure key={era.title}>
              <EraImage
                $src={era.title === 'Den moderne tid' ? `${import.meta.env.BASE_URL}modern.webp` : era.thumbnailUrl}
              />
              <EraCaption>{era.displayTitle}</EraCaption>
            </EraFigure>
          ))}
        </EraGrid>
      </Section>
    </>
  )
}
