import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  h1, h2, h3, h4 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`
