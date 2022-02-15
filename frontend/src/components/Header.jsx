import styled from 'styled-components'
import { StyledLink } from '../utils/Atoms'
import Logo from '../assets/icon-left-font.png'
import colors from '../utils/Colors'

const HomeLogo = styled.img`
  height: 80px;
`
const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h1`
    font-size: 40px;
    color: ${colors.primary};
`

function Header(props) {
  const sumary = props.scalevalue
  return (
    <NavContainer>
        <HomeLogo src={Logo} />
        <Title>{sumary.title}</Title>
      <div>
          {sumary.menu.map((element, index) =>
         <StyledLink key={index} to={"../"+element}> {element} </StyledLink>
          )}
      </div>
    </NavContainer>
  )
}

export default Header