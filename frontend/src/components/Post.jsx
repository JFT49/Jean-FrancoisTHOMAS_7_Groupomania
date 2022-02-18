import styled from 'styled-components'
import colors from '../utils/Colors'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Loader, Wrapper } from '../utils/Atoms'

const Carte = styled.div`
  position: relative;
  width: 100%;
`
const PostDiv1 = styled.div`
  padding: 25px 10px;
  margin: 15px ;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid;
  border-radius: 30px;
`
const PostDiv = styled.div`
  padding: 25px 10px;
  margin: 15px ;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid;
  border-radius: 30px;
  width:100%;
`
const PostCross = styled.button`
  cursor: pointer;
  background: none;
  border: 0px;
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 40px;
  color: ${colors.secondary};
`
const PostImg = styled.img`
  max-height: 200px;
`
const PostText = styled.p`
  font-size: 40px;
  white-space: normal;
  color: ${colors.secondary};
`
const PostForm = styled.form`
  margin: 10px;
  font-size: 40px;
  color: ${colors.secondary};   
`

function Post(props) {

  const PostList = props.scalevalue
  const [error, setError] = useState(null)
  const [isDataLoading, setDataLoading] = useState(false)
  const [fileImage, setImage] = useState({})
  const [formMessage, setFormMessage] = useState({ message: "" })
  const handleMouseOver = (e) => { e.target.style.color = 'darkred' }
  const handleMouseLeave = (e) => { e.target.style.color = colors.secondary }
  const storage = JSON.parse(localStorage.getItem('objet'))
  const [thisUser, setUser] = useState({name:"", admin:false})

  const sendPost = () => {
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
    if (error) { return <span>Oups il y a eu un problème</span> }
  }

  const DeletePost = (postId) => {
    async function fetchDelete() {
      try { 
        var myInit = {
          method: 'DELETE',
          headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storage.token }),
        } 
        const call = await fetch(`http://localhost:8000/api/post/${postId}`, myInit)
        const response = await call.json() 
        console.log(response)
      } catch (error) {
        console.log('===== error =====', error)
        setError(true)
      } finally {
        window.location.reload()
      }
    }
    fetchDelete()
    if (error) { return <span>Oups il y a eu un problème</span> }
  }

  async function UserControle() {
    try { 
      var myInit = {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storage.token }),
      } 
      const response = await fetch(`http://localhost:8000/api/user/profile`, myInit)
      const profile = await response.json()
      setUser({name: profile.user.name, admin: profile.user.admin})  
    } catch (error) {
      console.log('===== error =====', error)
      setError(true)
    }
  }
  if (!thisUser.name.length) {
    UserControle()
  }

  return (
    <Wrapper>
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
          <Carte key={post.id}>
          {thisUser.name === post.author || thisUser.admin
          ? ( 
              <PostCross onClick={() => DeletePost(post.id)} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                X
              </PostCross> 
            ) 
          : ( null )
          }
          <Link to={`/Comments/${post.id}`} style={{color:'inherit', textDecoration:'inherit'}}>
            <PostDiv1>
              <PostImg src={post.image} />
              <PostText>
                {post.text} <br />
                De {post.author} le {post.createdAt}
              </PostText>
            </PostDiv1>
          </Link>
          </Carte>
        )  
      )}
    </Wrapper>

  )
}

export default Post