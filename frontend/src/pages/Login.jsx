import Header from '../components/Header'
import Footer from '../components/Footer'
import { Wrapper, Form, ResText } from '../utils/CSS'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"



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
      <Header scalevalue={summary} />
      <ResText>{signup.message}</ResText>
      <Form onSubmit={sendPost} novalidate>
        <label htmlFor="name"> Name :  </label><br/>
        <input onChange={(e) => setFormData({...formData, name: e.target.value})}  value={formData.name} name="name" id="name" required style={{fontSize: '0.8em', marginBottom: 20}} />
        <br/>
        <label htmlFor="password"> Password :  </label><br/>
        <input onChange={(e) => setFormData({...formData, password: e.target.value})}  value={formData.password} name="password" id="password" required style={{fontSize: '0.8em', marginBottom: 35}} />
        <br/>
        <button type="submit" style={{fontSize: '0.8em'}}  > Send </button>
        <br/>
      </Form>
      <Footer/>
    </Wrapper>
  )
}

export default Login