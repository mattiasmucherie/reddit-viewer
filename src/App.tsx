import React from 'react'
import PostList from './containers/PostList'
import styled from 'styled-components'

const AppContainer = styled.div`
  max-width: 640px;
  margin: 0 auto;
`
function App() {
  return (
    <AppContainer>
      <PostList />
    </AppContainer>
  )
}

export default App
