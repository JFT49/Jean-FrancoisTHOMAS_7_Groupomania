import styled from 'styled-components'
import colors from '../utils/Colors'
import Header from '../components/Header'
import { Wrapper } from '../utils/Atoms'

const ErrorTitle = styled.h1`
  font-weight: 300;
`
const ErrorSubtitle = styled.h2`
  font-weight: 300;
  color: ${colors.secondary};
`
const summary = {title:'Error', menu:['Login', 'Register', 'Home']}

function Error() {
  return (
    <div>
      <Header scalevalue={summary} />
      <Wrapper>
        <ErrorTitle>Oups...</ErrorTitle>
        <ErrorSubtitle>
          Il semblerait que la page que vous cherchez n’existe pas
        </ErrorSubtitle>
      </Wrapper>
    </div>
  )
}

export default Error