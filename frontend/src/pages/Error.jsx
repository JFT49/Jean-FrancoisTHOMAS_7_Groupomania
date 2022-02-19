import styled from 'styled-components'
import Header from '../components/Header'
import { Wrapper } from '../utils/Atoms'

const ErrorTitle = styled.h2`
  font size : 30px;
`
const ErrorSubtitle = styled.p`
  font size : 20px;
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