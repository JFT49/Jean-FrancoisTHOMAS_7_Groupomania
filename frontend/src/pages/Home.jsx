import Header from '../components/Header'
import Footer from '../components/Footer'
import Post from '../components/Post'
import { useEffect, useState } from 'react'
import { Wrapper, Loader, formatDate } from '../utils/CSS'

const summary = {title:'Home', menu:['Profile']}

function Home() {

  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(false)
  const [postList, setPostList] = useState([])

  useEffect(() => {
    async function fetchPost() {
      setDataLoading(true)
      try {
        const storage = JSON.parse(localStorage.getItem('objet'))
        var myInit = {
          method: 'GET',
          headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storage.token }),
        }
        const response = await fetch(`http://localhost:8000/api/post`, myInit)
        const postList = await response.json()
        if (postList.length){
          formatDate(postList)
          setPostList(postList)
        }
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

  return (
    <Wrapper>
      <Header scalevalue={summary} />
      {isDataLoading ? ( <Loader /> ) : (
        <Post scalevalue={postList} />
      )} 
      <Footer/>
    </Wrapper>
  )
}

export default Home