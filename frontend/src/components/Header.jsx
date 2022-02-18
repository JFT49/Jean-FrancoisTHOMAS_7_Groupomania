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
  
  return (
    <Wrapper>
      <div>
        <HomeLogo src={Logo} alt="Logo Groupomania"/>
      </div>
        <Title>{sumary.title}</Title>
          {sumary.menu.map((element, index) =>
         <StyledLink key={index} to={"../"+element}> {element} </StyledLink>
          )}
    </Wrapper>
  )
}

export default Header