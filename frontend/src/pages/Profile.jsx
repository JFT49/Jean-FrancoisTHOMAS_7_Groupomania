import styled from 'styled-components'
import colors from '../utils/Colors'
import Header from '../components/Header'
import { Wrapper } from '../utils/Atoms'
import { useEffect, useState } from 'react'
import { Loader } from '../utils/Atoms'

// import { ProfileID }  from '../datas/ProfileID'

const ProfileText = styled.div`
    font-size: 40px;
    color: ${colors.secondary};
    
`
const summary = {title:'Profile', menu:['Logout', 'Home']}

function Profile() {

  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    async function fetchPost() {
      setDataLoading(true)
      try {
        var myInit = {
          method: 'POST',
          body: localStorage.getItem('objet'),
          headers: new Headers({'Content-Type': 'application/json'}),
          mode: 'cors',
          cache: 'default'
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
        <Wrapper>
          {isDataLoading ? ( <Loader /> ) : (
            <ProfileText>
                Name : { profile.user.name } <br />
                Mail : { profile.user.email }
            </ProfileText>
          )}
        </Wrapper>
      </div>
    )
  } else {
    return (<div></div>)
  }
  
}

export default Profile