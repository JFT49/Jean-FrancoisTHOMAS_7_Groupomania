import colors from '../utils/Colors'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader, PostForm, Carte, PostDiv, PostCross, PostImg, Text, Wrapper} from '../utils/CSS'

function PostId(props) {
  
  const Post = props.scalevalue
  const CommentList = props.scalevalue1
  const storage = JSON.parse(localStorage.getItem('objet'))
  const [formData, setFormData] = useState({ message: "" })
  const [error, setError] = useState(false)
  const [isDataLoading, setDataLoading] = useState(false)
  const { postid } = useParams()
  const handleMouseOver = (e) => { e.target.style.color = 'dark' }
  const handleMouseLeave = (e) => { e.target.style.color = colors.secondary }
  const [thisUser, setUser] = useState({name:"", admin:false})

  const sendComment = (e) => {     //Enregistrement d'un commentaire
    async function fetchPost() {
      setDataLoading(true)
      try {
        var myInit = {
          method: 'POST',
          body: JSON.stringify({formData}),
          headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storage.token}),
        }
        console.log(myInit)
        const response = await fetch(`http://localhost:8000/api/comment/${postid}`, myInit)
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

  const DeleteComment = (comId) => {     //Suppression d'un commentaire
    async function fetchDelete() {
      try { 
        var myInit = {
          method: 'DELETE',
          headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storage.token }),
        } 
        const call = await fetch(`http://localhost:8000/api/comment/${comId}`, myInit)
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
    async function UserControle() {   //controle de l'identité du user et de son droit admin
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
      <br/>
      <PostDiv key={Post.id} style={{backgroundColor: colors.background}}>
        { Post.image ? ( <PostImg src={Post.image} alt={"Illustration du post (id:" + Post.id + ")"}/> ) : ( null ) } 
        <Text style={{color:'black', margin:'10px'}}>
          {Post.text} <br />
          De {Post.author} <br />
          le {Post.createdAt}
        </Text>
      </PostDiv>
      <PostForm onSubmit={sendComment}>
        <label htmlFor="message"> New Comment :  </label>
        <textarea onChange={(e) => setFormData({...formData, message: e.target.value})}  value={formData.message} name="message" id="message" required style={{marginTop:'10px',fontSize: '0.8em'}}/>
        <br/>
        <button type="submit" style={{fontSize: '0.8em'}}  > Send </button>
      </PostForm>
      {isDataLoading ? ( <Loader /> ) : (
        CommentList.map((com) =>
          <Carte key={com.id}>
            <PostDiv>
              {thisUser.name === com.author || thisUser.admin
              ? ( 
                  <PostCross onClick={() => DeleteComment(com.id)} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                    X
                  </PostCross> 
                ) 
              : ( null )
              }
                <Text >
                  {com.text} <br />
                  De {com.author} <br />
                  le {com.createdAt}
                </Text>
            </PostDiv>
          </Carte>
        )
      )}
    </Wrapper>
  )
}

export default PostId