import Header from '../components/Header'
import Post from '../components/Post'
import { Wrapper } from '../utils/Atoms'
import { useEffect, useState } from 'react'
import { Loader } from '../utils/Atoms'

// import { PostList }  from '../datas/PostList'

const summary = {title:'Home', menu:['Logout', 'Profile']}

function Home() {

  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(false)
  const [PostList, setFreelancesList] = useState([])


  useEffect(() => {
    async function fetchPostList() {
      setDataLoading(true)
      try {
        const response = await fetch(`http://localhost:8000/api/post`)
        const { postList } = await response.json()
        setFreelancesList(postList)
      } catch (err) {
        console.log('===== error =====', err)
        setError(true)
      } finally {
        setDataLoading(false)
      }
    }
    fetchPostList()
  }, [])

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <div>
      <Header scalevalue={summary} />
      <Wrapper>
        {isDataLoading ? ( <Loader /> ) : (
          <Post scalevalue={PostList} />
         )}
      </Wrapper>
    </div>
  )
}

export default Home