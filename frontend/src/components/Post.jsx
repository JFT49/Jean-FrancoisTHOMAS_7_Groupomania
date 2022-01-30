import styled from 'styled-components'
import colors from '../utils/Colors'
import { Link } from 'react-router-dom'

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
  return (
    <PostContainer>
        {PostList.map((post) =>
            <Link to={`/Comments/:${post.id}`} style={{color:'inherit', textDecoration:'inherit'}}>
            <PostDiv key={post.id}>
                <PostImg src={post.image} />
                <PostText>
                    {post.text} <br />
                    De {post.author} le {post.date}
                </PostText>
            </PostDiv>
            </Link>
        )}
        <PostDiv>
          <PostForm id="Post" novalidate success-msg="Your message has been sent." fail-msg="Sorry it seems that our mail server is not responding, Sorry for the inconvenience!">
            <label for="message"> New Post :  </label>
            <textarea id="message" rows="3" cols="30" required style={{fontSize: 25}} />
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