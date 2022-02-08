import styled from 'styled-components'
import colors from '../utils/Colors'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Loader } from '../utils/Atoms'

const PostContainer = styled.div`
  padding: 30px;

`
const PostDiv = styled.div`
  padding: 30px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid;
  border-radius: 30px;
`

// const PostImg = styled.img`
//   max-height: 200px;
// `

const PostText = styled.p`
    font-size: 40px;
    color: ${colors.secondary};
`

const PostForm = styled.form`
    font-size: 40px;
    color: ${colors.secondary};   
`

function Post(props) {

  const PostList = props.scalevalue

  const storage = JSON.parse(localStorage.getItem('objet'))
  const [formData, setFormData] = useState({
    message: "",
    image: null,
    id: storage.userId
  })

  const [error, setError] = useState(null)
  const [isDataLoading, setDataLoading] = useState(false)

  const sendPost = (e) => {
    // e.preventDefault()
    async function fetchPost() {
      setDataLoading(true)
      try {
        var myInit = {
          method: 'POST',
          body: JSON.stringify({formData}),
          headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storage.token}),
          mode: 'cors',
          cache: 'default'
        }
        const response = await fetch(`http://localhost:8000/api/post`, myInit)
        const message = await response.json()
        console.log(message)
      } catch (error) {
        console.log('===== error =====', error)
        setError(true)
      } finally {
        setDataLoading(false)
      }
    }
    fetchPost()

    if (error) {
      return <span>Oups il y a eu un problème</span>
    }
  }

  return (
    <PostContainer>
        {isDataLoading ? ( <Loader /> ) : (
          PostList.map((post) =>
              <Link to={`/Comments/${post.id}`} style={{color:'inherit', textDecoration:'inherit'}} key={post.id}>
              <PostDiv>
                  {/* <PostImg src={post.image} /> */}
                  <PostText>
                      {post.text} <br />
                      De {post.author} le {post.createdAt}
                  </PostText>
              </PostDiv>
              </Link>
          )  
        )}
        <PostDiv>
          <PostForm onSubmit={sendPost}>
            <label for="message"> New Post :  </label>
            <textarea onChange={(e) => setFormData({...formData, message: e.target.value})}  value={formData.message} name="message" id="message" required></textarea>
            <br/>
            <label for="image"> Image :  </label>
            <input id="image" type="file" accept="image/png, image/jpg, image/gif" style={{fontSize: 25}} />
            <br/>
            <button type="submit" style={{fontSize: 25}}  > Send </button>
          </PostForm>
        </PostDiv> 
    </PostContainer>
  )
}

export default Post