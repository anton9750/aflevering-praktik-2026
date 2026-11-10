import styled from 'styled-components'
import { Link } from 'react-router-dom'

const FooterEl = styled.footer`
  margin-top: auto;
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(4)};
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
`

export function Footer() {
  return (
    <FooterEl>
      <span>&copy; {new Date().getFullYear()} Tidsrejsen</span>
      <nav>
        <Link to="/privatliv">Privatlivspolitik</Link>
      </nav>
    </FooterEl>
  )
}
