import Header from '../components/Header'
import { Wrapper } from '../utils/Atoms'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Loader } from '../utils/Atoms'
import PostId from '../components/PostId'

function formatDate(object) {
  if (object.length) {
    const j = object.length
    for (let i=0; i<j; i++){
      object[i].createdAt = object[i].createdAt.substring(0,10) + " à " + object[i].createdAt.substring(11,16)
    }
  } else {
    object.createdAt = object.createdAt.substring(0,10) + " à " + object.createdAt.substring(11,16)
  }
}

const summary = {title:'Comments', menu:['Profile', 'Home']}
 
function Comments() {   
  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(null)
  const [postSingle, setPostSingle] = useState([])
  const [commentList, setCommentList] = useState([])
  const { postid } = useParams()

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('objet'))
    var myInit = {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storage.token }),
    } 

    async function fetchPostId() {
      setDataLoading(true)
      try {
        const response = await fetch(`http://localhost:8000/api/post/${postid}`, myInit)
        const postSingle = await response.json()
        formatDate(postSingle)
        setPostSingle(postSingle)
      } catch (error) {
        console.log('===== error =====', error)
        setError(true)
      } finally {
        setDataLoading(false)
      }
    }
    fetchPostId()

    async function fetchComment() {
      setDataLoading(true)
      try {
        const response = await fetch(`http://localhost:8000/api/comment/${postid}`, myInit)
        const commentList = await response.json()
        if(commentList.length){
          formatDate(commentList)
          setCommentList(commentList)
        }
      } catch (error) {
        console.log('===== error =====', error)
        setError(true)
      } finally {
        setDataLoading(false)
      }
    }
    fetchComment() 
      
  }, [postid] )

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <div>
      <Header scalevalue={summary} />
      <Wrapper>
        {isDataLoading ? ( <Loader /> ) : (
          <PostId scalevalue={postSingle} scalevalue1={commentList} />
        )} 
      </Wrapper>
    </div>
  )
}

export default Comments