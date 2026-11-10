export type ThemeMode = 'light' | 'dark' | 'retro'

export interface AppTheme {
  mode: ThemeMode
  colors: {
    background: string
    surface: string
    text: string
    textMuted: string
    primary: string
    primaryText: string
    border: string
    accent: string
  }
  fonts: {
    heading: string
    body: string
  }
  spacing: (factor: number) => string
  radii: {
    sm: string
    md: string
    lg: string
  }
}

const spacing = (factor: number) => `${factor * 0.25}rem`

const fonts = {
  heading: "'Playfair Display', Georgia, serif",
  body: "'Inter', system-ui, sans-serif",
}

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    background: '#ffffff',
    surface: '#f4f4f6',
    text: '#1a1a1a',
    textMuted: '#5c5c66',
    primary: '#2b4c7e',
    primaryText: '#ffffff',
    border: '#dcdce2',
    accent: '#c0392b',
  },
  fonts,
  spacing,
  radii: { sm: '4px', md: '8px', lg: '16px' },
}

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    background: '#121214',
    surface: '#1c1c20',
    text: '#f0f0f2',
    textMuted: '#a3a3ab',
    primary: '#6f9ceb',
    primaryText: '#121214',
    border: '#2c2c32',
    accent: '#e67e22',
  },
  fonts,
  spacing,
  radii: { sm: '4px', md: '8px', lg: '16px' },
}

export const retroTheme: AppTheme = {
  mode: 'retro',
  colors: {
    background: '#f3e9d2',
    surface: '#e8dab7',
    text: '#3b2f1e',
    textMuted: '#6b5a3f',
    primary: '#7a3b1c',
    primaryText: '#f3e9d2',
    border: '#cbb98b',
    accent: '#8c2f1f',
  },
  fonts,
  spacing,
  radii: { sm: '4px', md: '8px', lg: '16px' },
}

export const themes: Record<ThemeMode, AppTheme> = {
  light: lightTheme,
  dark: darkTheme,
  retro: retroTheme,
}
