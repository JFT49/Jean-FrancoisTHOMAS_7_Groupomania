import styled from 'styled-components'
import Logo from '../assets/icon-left-font.png'
import colors from '../utils/Colors'
import { Link } from 'react-router-dom'

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
export const StyledLink = styled(Link)`
  padding: 10px 15px;
  color: ${colors.secondary};
  text-decoration: none;
  font-size: 30px;
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