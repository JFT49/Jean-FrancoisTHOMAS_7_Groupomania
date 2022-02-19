import styled from 'styled-components'
import colors from '../utils/Colors'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Loader, Wrapper } from '../utils/Atoms'

const PostForm = styled.form`
padding: 25px 0;
margin: 25px 10px 10px 10px;
display: flex;
flex-direction: column;
align-items: center;
border: solid black;
border-radius: 30px;
width:100%;
font-size: 40px;
color: ${colors.secondary};  
  @media (max-width: 800px) {
    font-size: 25px; 
`
const LabelImg = styled.label`
  background: #efefef;
  color: black;
  padding: 0 7px 4px 7px;
  font-size: 25px;
  border: 1px solid grey;
  border-radius: 3px;
`
const InputImg = styled.input`
  display: none;
`

const Carte = styled.div`
  position: relative;
  width: 100%;
  padding: 0 10px;
  margin: 15px 0;
`
const PostDiv = styled.div`
  padding: 25px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid;
  border-radius: 30px;
`
const PostCross = styled.button`
  cursor: pointer;
  background: none;
  border: 0px;
  position: absolute;
  right: 22px;
  top: 15px;
  font-size: 25px;
  color: ${colors.secondary};
`
const PostImg = styled.img`
  max-width: 300px;
  @media (max-width: 800px) {
    max-width: 150px;
  }
`
const PostText = styled.p`
  font-weight: normal;
  font-size: 40px;
  color: ${colors.secondary};
  @media (max-width: 800px) {
    font-size: 25px;
  }
`


function Post(props) {
  
  const PostList = props.scalevalue
  const [error, setError] = useState(false)
  const [isDataLoading, setDataLoading] = useState(false)
  const [fileImage, setImage] = useState({})
  const [formMessage, setFormMessage] = useState({ message: "" })
  const handleMouseOver = (e) => { e.target.style.color = 'black'}
  const handleMouseLeave = (e) => { e.target.style.color = colors.secondary}
  const buttonMouseOver = (e) => { e.target.style.background = 'lightgrey'}
  const buttonMouseLeave = (e) => { e.target.style.background = '#efefef'}
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
      <PostForm onSubmit={sendPost} >
        <label htmlFor='message'> New Post :  </label>
        <textarea onChange={(e) => setFormMessage({...formMessage, message: e.target.value})}  value={formMessage.message} name="message" id="message" required></textarea>
        <br/>
        <LabelImg htmlFor='image'onMouseOver={buttonMouseOver} onMouseLeave={buttonMouseLeave} >Choose a picture</LabelImg> 
        <InputImg onChange={(e) => setImage({...fileImage, image: e.target.files[0]})}  name="image" id="image" type="file" accept="image/png, image/jpeg, image/jpg, image/gif"/>
        { fileImage.image ? <div style={{width: '300px', fontSize:'0.5em', wordBreak: 'break-all', textAlign:'center'}}>{fileImage.image.name}</div> : null }
        <br/>
        <button type="submit" style={{fontSize: 25}}  > Send </button>
      </PostForm>
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
            <PostDiv>
              { !post.image ? ( null ) : ( <PostImg src={post.image} alt={"Illustration d'un post (id:" + post.id + ")"} /> ) } 
              <PostText>
                {post.text} <br />
                De {post.author} <br />
                le {post.createdAt}
              </PostText>
            </PostDiv>
          </Link>
          </Carte>
        )  
      )}
    </Wrapper>

  )
}

export default Post