import { createContext, useMemo, useState, type ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { themes, type ThemeMode } from '../styles/theme'

export interface ThemeContextValue {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'tidsrejsen-theme'

function getInitialMode(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'retro') {
    return stored
  }
  return 'light'
}

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode)

  const setMode = (next: ThemeMode) => {
    setModeState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  const value = useMemo(() => ({ mode, setMode }), [mode])

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={themes[mode]}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
