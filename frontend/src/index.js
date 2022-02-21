import './utils/index.css'

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { render } from "react-dom"

import Error from './pages/Error'
import Home from './pages/Home'
import Comments from './pages/Comments'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

const rootElement = document.getElementById('root')
render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Comments/:postid" element={<Comments />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  </BrowserRouter>
  ,rootElement
);