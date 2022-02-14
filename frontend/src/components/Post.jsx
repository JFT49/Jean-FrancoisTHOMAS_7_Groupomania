import styled from 'styled-components'
import colors from '../utils/Colors'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Loader } from '../utils/Atoms'

const PostContainer = styled.div`
  padding: 30px;
`
const PostDiv = styled.div`
  position: relative;
  padding: 30px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid;
  border-radius: 30px;
`
const PostCross = styled.p`
  position: absolute;
  right: 20px;
  top: -30px;
  font-size: 40px;
  color: ${colors.secondary};
`
const PostImg = styled.img`
  max-height: 200px;
`
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
  const [error, setError] = useState(null)
  const [isDataLoading, setDataLoading] = useState(false)
  const [fileImage, setImage] = useState({})
  const [formMessage, setFormMessage] = useState({ message: "" })
  const [thisUser, setUser] = useState(null)
 
  const sendPost = (e) => {
    async function fetchPost() {
      setDataLoading(true)
      try {
        const formData = new FormData()
        formData.append("image", fileImage.image)
        formData.append("message", formMessage.message)
        var myInit = {
          method: 'POST',
          body: formData,
          headers: new Headers({'Authorization': 'Bearer ' + storage.token})
        }
        const response = await fetch( `http://localhost:8000/api/post`, myInit)
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

  async function UserControle() {
    try { 
      const storage = JSON.parse(localStorage.getItem('objet'))
      var myInit = {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storage.token }),
      } 
      const response = await fetch(`http://localhost:8000/api/user/profile`, myInit)
      const profile = await response.json()
      setUser(profile.user.name)   
    } catch (error) {
      console.log('===== error =====', error)
      setError(true)
    }
  }
  UserControle()

  return (
    <PostContainer>
      <PostDiv>
        <PostForm onSubmit={sendPost} >
          <label for="message"> New Post :  </label>
          <textarea onChange={(e) => setFormMessage({...formMessage, message: e.target.value})}  value={formMessage.message} name="message" id="message" required></textarea>
          <br/>
          <label for="image"> Image :  </label>
          <input onChange={(e) => setImage({...fileImage, image: e.target.files[0]})}  name="image" id="image" type="file" accept="image/png, image/jpeg, image/jpg, image/gif" style={{fontSize: 25}}/>
          <br/>
          <button type="submit" style={{fontSize: 25}}  > Send </button>
        </PostForm>
      </PostDiv> 
      {isDataLoading ? ( <Loader /> ) : (
        PostList.map((post) =>
          <Link to={`/Comments/${post.id}`} style={{color:'inherit', textDecoration:'inherit'}} key={post.id}>
          <PostDiv>
            {thisUser === post.author ? ( <PostCross>X</PostCross> ) : ( <div></div> )}
            <PostImg src={post.image} />
            <PostText>
              {post.text} <br />
              De {post.author} le {post.createdAt}
            </PostText>
          </PostDiv>
          </Link>
        )  
      )}
    </PostContainer>
  )
}

export default Post