import styled from 'styled-components'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Wrapper } from '../utils/CSS'

const ErrorTitle = styled.h2`
  font-size : 2em;
`
const ErrorSubtitle = styled.p`
  font-size : 1.2em;
  text-align: center;
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
      <br/>
      <Footer/>
    </Wrapper>
  )
}

export default Error