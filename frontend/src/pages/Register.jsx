import styled from 'styled-components'
import colors from '../utils/Colors'
import Header from '../components/Header'
import { Wrapper } from '../utils/Atoms'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const LoginForm = styled.form`
  padding: 20px;
  font-size: 40px;
  color: ${colors.secondary};   
`

const summary = {title:'Register', menu:[ 'Login']}

function Register() {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [error, setError] = useState(null)
  const [response, setSignup] = useState([])

  const sendPost = (e) => {
    e.preventDefault()    // empêche le reload

    async function fetchPost() {
      try {
        var myInit = {
          method: 'POST',
          body: JSON.stringify({formData}),
          headers: new Headers({'Content-Type': 'application/json'})
        }
        const resp = await fetch(`http://localhost:8000/api/user/signup`, myInit)
        const message = await resp.json()
        console.log(message)
        if (message.error){ 
          if(message.error.fields.name) { setSignup({message: "Nom: " + message.error.fields.name + "\ndéjà utilisé !"}) }
          if(message.error.fields.email) { setSignup({message: "Email: " + message.error.fields.email + "\ndéjà utilisé !"}) }
        }
        else { setSignup(message) }
        if ( message.created ) { navigate(`/Login`) }
      }
      catch (error) {
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
      <Header scalevalue={summary} />
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
        <div class="text"><pre>{response.message}</pre></div> 
    </Wrapper>
  )
}

export default Register