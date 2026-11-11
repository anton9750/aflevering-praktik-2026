import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import type { ThemeMode } from '../../styles/theme'

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Brand = styled(NavLink)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

const Links = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(4)};
  list-style: none;
  margin: 0;
  padding: 0;

  a {
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 500;

    &.active {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

const ThemeSwitcher = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`

const ThemeButton = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.primaryText : theme.colors.text)};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  cursor: pointer;
  font-size: 0.8rem;
`

const themeOptions: { mode: ThemeMode; label: string }[] = [
  { mode: 'retro', label: 'Retro' },
  { mode: 'light', label: 'Lys' },
  { mode: 'dark', label: 'Mørk' },
]

export function Nav() {
  const { mode, setMode } = useTheme()

  return (
    <Header>
      <Brand to="/">Tidsrejsen</Brand>
      <Links>
        <li>
          <NavLink to="/tidslinje">Tidslinje</NavLink>
        </li>
        <li>
          <NavLink to="/kort">Kort</NavLink>
        </li>
        <li>
          <NavLink to="/soeg">Søg</NavLink>
        </li>
        <li>
          <NavLink to="/sammenlign">Sammenlign</NavLink>
        </li>
        <li>
          <NavLink to="/quiz">Quiz</NavLink>
        </li>
        <li>
          <NavLink to="/samlinger">Samlinger</NavLink>
        </li>
        <li>
          <NavLink to="/favoritter">Favoritter</NavLink>
        </li>
        <li>
          <NavLink to="/login">Log ind</NavLink>
        </li>
      </Links>
      <ThemeSwitcher>
        {themeOptions.map((option) => (
          <ThemeButton
            key={option.mode}
            type="button"
            $active={mode === option.mode}
            onClick={() => setMode(option.mode)}
          >
            {option.label}
          </ThemeButton>
        ))}
      </ThemeSwitcher>
    </Header>
  )
}
