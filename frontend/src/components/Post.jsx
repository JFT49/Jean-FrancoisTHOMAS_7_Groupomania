import colors from '../utils/Colors'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Loader, PostForm, LabelImg, Carte, PostDiv, PostCross, PostImg, Text, Wrapper} from '../utils/CSS'

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

  const sendPost = () => {          //Enregistrement d'un Post
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

  const DeletePost = (postId) => {    //Suppression d'un Post
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

  useEffect(() => {
    async function UserControle() {       //controle de l'identité du user et de son droit admin
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
    UserControle()
  }, [storage.token])

  return (
    <Wrapper>
      <PostForm onSubmit={sendPost} >
        <label htmlFor='message'> New Post :  </label>
        <textarea onChange={(e) => setFormMessage({...formMessage, message: e.target.value})}  value={formMessage.message} name="message" id="message" required style={{marginTop:'10px',fontSize: '0.8em'}}/>
        <br/>
        <LabelImg htmlFor='image'onMouseOver={buttonMouseOver} onMouseLeave={buttonMouseLeave} >Choose a picture</LabelImg> 
        <input onChange={(e) => setImage({...fileImage, image: e.target.files[0]})}  name="image" id="image" type="file" accept="image/png, image/jpeg, image/jpg, image/gif" style={{display:'none'}}/>
        { fileImage.image ? <div style={{width: '300px', fontSize:'0.5em', wordBreak: 'break-all', textAlign:'center'}}>{fileImage.image.name}</div> : null }
        <br/>
        <button type="submit" style={{fontSize: '0.8em'}}  > Send </button>
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
              { post.image ? ( <PostImg src={post.image} alt={"Illustration d'un post (id:" + post.id + ")"} /> ) : (null) } 
              <Text>
                {post.text} <br />
                De {post.author} <br />
                le {post.createdAt}
              </Text>
            </PostDiv>
          </Link>
          </Carte>
        )  
      )}
    </Wrapper>

  )
}

export default Post