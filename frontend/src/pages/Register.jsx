import Header from '../components/Header'
import Footer from '../components/Footer'
import { Wrapper, Form, ResText } from '../utils/CSS'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

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

  const sendForm = (e) => {
    e.preventDefault()    // empêche le reload pour conserver les données du formulaire
    async function fetchPost() {
      try {
        var myInit = {
          method: 'POST',
          body: JSON.stringify({formData}),
          headers: new Headers({'Content-Type': 'application/json'})
        }
        const resp = await fetch(`http://localhost:8000/api/user/signup`, myInit)
        const message = await resp.json()
        if (message.error){ 
          if(message.error.fields.name) { setSignup({message: "Nom \"" + message.error.fields.name + "\" déjà utilisé !"}) }
          if(message.error.fields.email) { setSignup({message: "Email \"" + message.error.fields.email + "\" déjà utilisé !"}) }
        }
        else { setSignup(message) }
        if ( message.message === 'Utilisateur créé !' ) { navigate(`/Login`) }  
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
      <ResText>{response.message}</ResText> 
      <Form onSubmit={sendForm} novalidate>
        <label htmlFor="name"> Name :  </label><br/>
        <input onChange={(e) => setFormData({...formData, name: e.target.value})}  value={formData.name} name="name" id="name" required style={{fontSize: '0.8em', marginBottom: 20}} />
        <br/>
        <label htmlFor="email"> Email :  </label><br/>
        <input onChange={(e) => setFormData({...formData, email: e.target.value})}  value={formData.email} name="email" id="email" type="email" required style={{fontSize: '0.8em', marginBottom: 20}} />
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

export default Register