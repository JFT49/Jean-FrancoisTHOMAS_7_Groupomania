import styled from 'styled-components'
import colors from '../utils/Colors'
import Header from '../components/Header'
import { Wrapper } from '../utils/Atoms'
import React, { useState } from 'react'


const LoginForm = styled.form`
    font-size: 40px;
    color: ${colors.secondary};
    
`

const summary = {title:'Login', menu:[ 'Register', 'Home']}


function Login() {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [error, setError] = useState(null)
  const [message, setSignup] = useState([])

  const sendPost = (e) => {
    e.preventDefault()    // empêche le reload

    async function fetchPost() {
      try {
        var myInit = {
          method: 'POST',
          body: JSON.stringify({formData}),
          headers: new Headers({'Content-Type': 'application/json'}),
          mode: 'cors',
          cache: 'default'
        }
        const response = await fetch(`http://localhost:8000/api/user/login`, myInit)
        const message = await response.json()
        setSignup(message)
        localStorage.clear()
        localStorage.setItem('objet', JSON.stringify(message))
        console.log(JSON.parse(localStorage.getItem('objet')))
        
        
      } catch (error) {
        console.log('===== error =====', error)
        setError(true)
      }
    }
    fetchPost()

    if (error) {
      return <span>Oups il y a eu un problème</span>
    }
  }

  return (
    <div>
      <Header scalevalue={summary} />
      <Wrapper>
        <LoginForm onSubmit={sendPost} novalidate>
            <label for="name"> Name :  </label>
            <input onChange={(e) => setFormData({...formData, name: e.target.value})}  value={formData.name} name="name" id="name" required style={{fontSize: 25}} />
            <br/>
            <label for="email"> Email :  </label>
            <input onChange={(e) => setFormData({...formData, email: e.target.value})}  value={formData.email} name="email" id="email" type="email" required style={{fontSize: 25}} />
            <br/>
            <label for="password"> Password :  </label>
            <input onChange={(e) => setFormData({...formData, password: e.target.value})}  value={formData.password} name="password" id="password" required style={{fontSize: 25}} />
            <br/>
            <button type="submit" style={{fontSize: 25}}  > Send </button>
            <br/>
        </LoginForm>
        <br/>
        <div class="text"><pre>{message.message}</pre></div>
      </Wrapper>
    </div>
  )
}

export default Login