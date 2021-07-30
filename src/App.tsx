import React, { useState } from 'react'
import PostList from './containers/PostList'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { lightTheme } from './themes/lightTheme'
import { darkTheme } from './themes/darkTheme'
import { NavigationButton } from './components/PageButtons'

declare module 'styled-components' {
  export interface DefaultTheme {
    bg: string
    color: string
    input: {
      bg: string
      border: string
      color: string
      focus: {
        bg: string
        border: string
      }
    }
    card: {
      bg: string
      border: string
      firstColumnBg: string
    }
  }
}
const AppContainer = styled.div`
  max-width: 640px;
  margin: 0 auto;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1rem 0.5rem 1rem;
`
const DarkButton = styled(NavigationButton)<{darkMode: boolean}>`
  background: inherit;
  border: ${props => props.darkMode? '#343536' : '#ccc'} solid 1px;
  
`
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.color};
    transition: background-color 0.25s, color 0.25s;
  }
`

function App() {
  const [darkMode, setDarkMode] = useState(true)
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <ButtonContainer>
        <DarkButton darkMode={darkMode} onClick={() => setDarkMode((prev) => !prev)}>{darkMode ? '☀️' : '🌑'}</DarkButton>
      </ButtonContainer>
      <AppContainer>
        <GlobalStyle />
        <PostList />
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
