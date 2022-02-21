import styled from 'styled-components'
import Logo from '../assets/icon.png'
import { Wrapper } from '../utils/CSS'

const HomeLogo = styled.img`
  width: 100px;
  @media (max-width: 800px) {
    width: 70px;
  }
`

function Footer() {
  
  return (
    <footer>
    <Wrapper>
        <HomeLogo src={Logo} alt="Logo Groupomania"/>
    </Wrapper>
    </footer>
  )
}

export default Footer