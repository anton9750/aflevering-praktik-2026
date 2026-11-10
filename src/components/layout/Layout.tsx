import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'

const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(6)};
`

export function Layout() {
  return (
    <>
      <Nav />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  )
}
