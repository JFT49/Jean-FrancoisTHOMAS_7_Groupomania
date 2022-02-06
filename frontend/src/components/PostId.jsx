import styled from 'styled-components'
import colors from '../utils/Colors'
// import { PostList }  from '../datas/PostList'
// import { CommentList }  from '../datas/CommentList'

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

  return (
    <PostContainer>
        <PostDiv key={Post.id} style={{backgroundColor: colors.background}}>
            <PostImg src={Post.image} />
            <PostText>
                {Post.text} <br />
                De {Post.author} le {Post.createdAt}
            </PostText>
        </PostDiv>
        {CommentList.map((com) =>
            <PostDiv key={com.id}>
                <PostText >
                    {com.text} <br />
                    De {com.author} le {com.createdAt}
                </PostText>
            </PostDiv>
        )}
        <PostDiv>
          <PostForm id="Comment" novalidate success-msg="Your message has been sent." fail-msg="Sorry it seems that our mail server is not responding, Sorry for the inconvenience!">
            <div class="form-group">
                <label> New Comment :  </label>
                <textarea id="message" rows="3" cols="30" required style={{fontSize: 25}} />
            </div>
            <button type="submit" style={{fontSize: 25}}  > Send </button>
          </PostForm>
        </PostDiv> 
    </PostContainer>
  )
}

export default PostId