import styled from 'styled-components'
import colors from '../utils/Colors'
import Header from '../components/Header'
import { Wrapper } from '../utils/Atoms'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const LoginForm = styled.form`
    font-size: 40px;
    color: ${colors.secondary};
`

const summary = {title:'Login', menu:[ 'Register']}

function Login() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: ""
  })
  const [error, setError] = useState(null)
  const [signup, setSignup] = useState([])

  const sendPost = (e) => {
    e.preventDefault()    // empêche le reload
    async function fetchPost() {
      try {
        var myInit = {
          method: 'POST',
          body: JSON.stringify({formData}),
          headers: new Headers({'Content-Type': 'application/json'}),
        }
        const response = await fetch(`http://localhost:8000/api/user/login`, myInit)
        const signup = await response.json()
        setSignup(signup)
        if (signup.token) {
        localStorage.clear()
        localStorage.setItem('objet', JSON.stringify(signup))
        navigate(`/Home`)
        }
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
          <label for="password"> Password :  </label>
          <input onChange={(e) => setFormData({...formData, password: e.target.value})}  value={formData.password} name="password" id="password" required style={{fontSize: 25}} />
          <br/>
          <button type="submit" style={{fontSize: 25}}  > Send </button>
          <br/>
        </LoginForm>
        <br/>
        <div class="text"><pre>{signup.message}</pre></div>
      </Wrapper>
    </div>
  )
}

export default Login