import Header from '../components/Header'
import Post from '../components/Post'
import { Wrapper } from '../utils/Atoms'

import { PostList }  from '../datas/PostList'

const summary = {title:'Home', menu:['Logout', 'Profile']}

function Home() {
  return (
    <div>
      <Header scalevalue={summary} />
      <Wrapper>
          <Post scalevalue={PostList} />
      </Wrapper>
    </div>
  )
}

export default Home