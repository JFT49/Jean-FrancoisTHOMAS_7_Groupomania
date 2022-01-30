import styled from 'styled-components'
import colors from '../utils/Colors'
import Header from '../components/Header'
import { Wrapper } from '../utils/Atoms'

import { ProfileID }  from '../datas/ProfileID'

const ProfileText = styled.p`
    font-size: 40px;
    color: ${colors.secondary};
    
`

const summary = {title:'Profile', menu:['Logout', 'Home']}

function Profile() {
  return (
    <div>
      <Header scalevalue={summary} />
      <Wrapper>
          <ProfileText >
              Name : {ProfileID[0].name} <br />
              Mail : {ProfileID[0].email}
          </ProfileText>
      </Wrapper>
    </div>
  )
}

export default Profile