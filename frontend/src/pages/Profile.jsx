import styled from 'styled-components'
import colors from '../utils/Colors'
import Header from '../components/Header'
import { Wrapper } from '../utils/Atoms'
import { useEffect, useState } from 'react'
import { Loader } from '../utils/Atoms'
import { Link } from 'react-router-dom'

const ProfileText = styled.div`
    font-size: 40px;
    color: ${colors.secondary};
`

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
          body: localStorage.getItem('objet'),
          headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storage.token }),
        } 
      const response = await fetch(`http://localhost:8000/api/user/delete`, myInit)
      const resp = await response.json()
      console.log(resp)
    } catch (error) {
      console.log('===== error =====', error)
    }
  }
  fetchDelete()
  localStorage.clear()
  alert('You are Unregister !')
}

const summary = {title:'Profile', menu:['Home']}

function Profile() {

  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(null)
  const [profile, setProfile] = useState(null)

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
      <div>
        <Header scalevalue={summary} />
        {isDataLoading ? ( <Loader /> ) : (
        <Wrapper>
            <ProfileText>
                Name : { profile.user.name } <br />
                Mail : { profile.user.email }
            </ProfileText>
            <Link  to={`/Login`} style={{marginTop: 50}}>
            <button onClick={() => Deconnexion()} style={{fontSize: 25}}  > Deconnexion </button>
            </Link>
            <Link  to={`/Register`} style={{margin: 25}}>
            <button onClick={() => Unregister()} style={{fontSize: 25}}  > Unregister </button>
            </Link>
        </Wrapper>
        )}
      </div>
    )
  } 
  else { return (<div></div>) }
}

export default Profile