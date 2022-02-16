import styled from 'styled-components'
import colors from '../utils/Colors'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../utils/Atoms'

const PostContainer = styled.div`
  padding: 30px;
`
const Carte = styled.div`
  position: relative;
  margin: 15px 0 15px 0;
`
const PostCross = styled.button`
  cursor: pointer;
  background: none;
  border: 0px;
  position: absolute;
  right: 30px;
  top: 10px;
  font-size: 40px;
  color: ${colors.secondary};
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
const PostText = styled.p`
  font-size: 40px;
  color: ${colors.secondary};
`
const PostImg = styled.img`
  max-height: 200px;
`
const PostForm = styled.form`
  font-size: 40px;
  color: ${colors.secondary};   
`

function PostId(props) {
  const Post = props.scalevalue
  const CommentList = props.scalevalue1
  const storage = JSON.parse(localStorage.getItem('objet'))
  const [formData, setFormData] = useState({ message: "" })
  const [error, setError] = useState(null)
  const [isDataLoading, setDataLoading] = useState(false)
  const { postid } = useParams()
  const handleMouseOver = (e) => { e.target.style.color = 'darkred' }
  const handleMouseLeave = (e) => { e.target.style.color = colors.secondary }
  const [thisUser, setUser] = useState(null)

  const sendComment = (e) => {
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

  const DeleteComment = (comId) => {
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

  async function UserControle() {
    try { 
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
      <PostDiv key={Post.id} style={{backgroundColor: colors.background}}>
        <PostImg src={Post.image} />
        <PostText>
          {Post.text} <br />
          De {Post.author} le {Post.createdAt}
        </PostText>
      </PostDiv>
      <PostDiv>
        <PostForm onSubmit={sendComment}>
          <label for="message"> New Comment :  </label>
          <textarea onChange={(e) => setFormData({...formData, message: e.target.value})}  value={formData.message} name="message" id="message" required></textarea>
          <br/>
          <button type="submit" style={{fontSize: 25}}  > Send </button>
        </PostForm>
      </PostDiv> 
      {isDataLoading ? ( <Loader /> ) : (
        CommentList.map((com) =>
          <Carte key={com.id}>
          {thisUser === com.author 
          ? ( 
              <PostCross onClick={() => DeleteComment(com.id)} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                X
              </PostCross> 
            ) 
          : ( null )
          }
          <PostDiv>
            <PostText >
              {com.text} <br />
              De {com.author} le {com.createdAt}
            </PostText>
          </PostDiv>
          </Carte>
        )
      )}
    </PostContainer>
  )
}

export default PostId