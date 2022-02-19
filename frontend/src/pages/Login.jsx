import styled from 'styled-components'
import colors from '../utils/Colors'
import Header from '../components/Header'
import { Wrapper } from '../utils/Atoms'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Helmet } from 'react-helmet'

const LoginForm = styled.form`
    padding: 20px;
    font-size: 40px;
    color: ${colors.secondary};
`

const summary = {title:'Login', menu:[ 'Register']}

function Login() {

  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [signup, setSignup] = useState([])
  const [formData, setFormData] = useState({ name: "", password: "" })

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
    
    <Wrapper>
      <Helmet><title>Groupomania</title></Helmet>
      <Header scalevalue={summary} />
      <section>
      <LoginForm onSubmit={sendPost} novalidate>
        <label htmlFor="name"> Name :  </label>
        <input onChange={(e) => setFormData({...formData, name: e.target.value})}  value={formData.name} name="name" id="name" required style={{fontSize: 25}} />
        <br/>
        <label htmlFor="password"> Password :  </label>
        <input onChange={(e) => setFormData({...formData, password: e.target.value})}  value={formData.password} name="password" id="password" required style={{fontSize: 25}} />
        <br/>
        <button type="submit" style={{fontSize: 25}}  > Send </button>
        <br/>
      </LoginForm>
      <br/>
      <div><pre>{signup.message}</pre></div>
      </section>
    </Wrapper>
  )
}

export default Login