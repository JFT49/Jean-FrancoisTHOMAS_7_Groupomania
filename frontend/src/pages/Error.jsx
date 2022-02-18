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
const summary = {title:'Error 404', menu:[]}

function Error() {
  return (
    <Wrapper>
      <Header scalevalue={summary} />
      <ErrorTitle>Oups...</ErrorTitle>
      <ErrorSubtitle>
        Il semblerait que la page que vous cherchez n’existe pas
      </ErrorSubtitle>
    </Wrapper>
  )
}

export default Error