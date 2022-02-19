import styled from 'styled-components'
import Logo from '../assets/icon-left-font.png'
import colors from '../utils/Colors'
import { Link } from 'react-router-dom'
import { Wrapper } from '../utils/Atoms'

const HomeLogo = styled.img`
  width: 100%;
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
  const handleMouseOver = (e) => { e.target.style.color = 'black' }
  const handleMouseLeave = (e) => { e.target.style.color = colors.secondary }
  
  return (
    <header>
    <Wrapper>
        <HomeLogo src={Logo} alt="Logo Groupomania"/>
        <Title>{sumary.title}</Title>
        <nav>
          {sumary.menu.map((element, index) =>
            <StyledLink key={index} to={"../"+element} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}> {element} </StyledLink>
          )}
        </nav>
    </Wrapper>
    </header>
  )
}

export default Header