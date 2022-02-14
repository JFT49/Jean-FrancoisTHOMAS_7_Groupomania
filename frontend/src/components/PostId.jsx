import styled from 'styled-components'
import colors from '../utils/Colors'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
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

    const sendComment = (e) => {
      //e.preventDefault()
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
              <PostDiv key={com.id}>
                  <PostText >
                      {com.text} <br />
                      De {com.author} le {com.createdAt}
                  </PostText>
              </PostDiv>
          )
        )}
    </PostContainer>
  )
}

export default PostId