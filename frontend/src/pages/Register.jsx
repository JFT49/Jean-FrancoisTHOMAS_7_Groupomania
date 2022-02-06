import styled from 'styled-components'
import colors from '../utils/Colors'
import Header from '../components/Header'
import { Wrapper } from '../utils/Atoms'
import React, { useState } from 'react'


const LoginForm = styled.form`
    font-size: 40px;
    color: ${colors.secondary};   
`

const summary = {title:'Register', menu:[ 'Login', 'Home']}

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const sendPost = (e) => {
    e.preventDefault()    // empêche le reload
    console.log(formData)
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
        </LoginForm>
      </Wrapper>
    </div>
  )
}

export default Register