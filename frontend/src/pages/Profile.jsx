import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { Wrapper, ProfileText, Loader } from '../utils/CSS'
import { Link } from 'react-router-dom'

function Deconnexion() {
  localStorage.clear()
  alert('You are deconnected !')
}

function Unregister() {
  async function fetchDelete() {
    try {  
      const storage = JSON.parse(localStorage.getItem('objet'))
        var myInit = {
          method: 'DELETE',
          headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storage.token }),
        } 
      const response = await fetch(`http://localhost:8000/api/user/delete`, myInit)
      const resp = await response.json()
      alert( resp.message )
    } catch (error) {
      console.log('===== error =====', error)
    } finally {
      localStorage.clear()
    }
  }
  fetchDelete()
}

const summary = {title:'Profile', menu:['Home']}

function Profile() {

  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(false)
  const [profile, setProfile] = useState()

  useEffect(() => {
    async function fetchPost() {
      setDataLoading(true)
      try { 
        const storage = JSON.parse(localStorage.getItem('objet'))
        var myInit = {
          method: 'GET',
          headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storage.token }),
        } 
        const response = await fetch(`http://localhost:8000/api/user/profile`, myInit)
        const profile = await response.json()
        setProfile(profile)
      } catch (error) {
        console.log('===== error =====', error)
        setError(true)
      } finally {
        setDataLoading(false)
      }
    }
    fetchPost()
  }, [])

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  if ( profile ){
    return (
      isDataLoading ? ( <Loader /> ) : (
        <Wrapper>
          <Header scalevalue={summary} />
          <ProfileText>
            Name : { profile.user.name } <br />
            Mail : { profile.user.email }
          </ProfileText>
          <br />
          <Link  to={`/Login`}>
          <button onClick={() => Deconnexion()} style={{fontSize: 25}}  > Deconnexion </button>
          </Link>
          <br />
          <Link  to={`/Register`}>
          <button onClick={() => Unregister()} style={{fontSize: 25}}  > Unregister </button>
          </Link>
          <br />
          <Footer/>
        </Wrapper>
      )
    )
  } 
  else { return (<div></div>) }
}

export default Profile