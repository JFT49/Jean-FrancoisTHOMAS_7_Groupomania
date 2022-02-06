import styled from 'styled-components'
import colors from '../utils/Colors'
import Header from '../components/Header'
import { Wrapper } from '../utils/Atoms'


const LoginForm = styled.form`
    font-size: 40px;
    color: ${colors.secondary};
    
`

const summary = {title:'Login', menu:[ 'Register', 'Home']}

function Login() {
  return (
    <div>
      <Header scalevalue={summary} />
      <Wrapper>
        <LoginForm id="form_1" novalidate success-msg="Your login has been sent." fail-msg="Sorry it seems that our mail server is not responding, Sorry for the inconvenience!">
            <label for="name"> Name :  </label>
            <input id="name" required style={{fontSize: 25}}  />
            <br/>
            <label for="email"> Email :  </label>
            <input id="email" type="email" required style={{fontSize: 25}} />
            <br/>
            <label for="password"> Password :  </label>
            <input id="password"  required style={{fontSize: 25}} />
            <br/>
            <button type="submit" style={{fontSize: 25}}  > Send </button>
        </LoginForm>
      </Wrapper>
    </div>
  )
}

export default Login