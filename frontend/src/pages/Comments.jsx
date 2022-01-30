import Header from '../components/Header'
import { Wrapper } from '../utils/Atoms'
// import { useParams } from 'react-router-dom'

import PostId from '../components/PostId'

const summary = {title:'Comments', menu:['Logout', 'Profile', 'Home']}

function Comments() {
    // const { postid } = useParams()
    const test = document.location.href.split(':')
    const postid = test[test.length-1]

    return (
      <div>
        <Header scalevalue={summary} />
        <Wrapper>
            <PostId scalevalue={postid} />
        </Wrapper>
      </div>
    )
}

export default Comments