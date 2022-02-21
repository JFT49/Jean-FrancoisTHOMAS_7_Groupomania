import styled, { keyframes } from 'styled-components'
import colors from './Colors'

export const Wrapper = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.backgroundLight};
`
export const PostForm = styled.form`
padding: 25px 0;
margin: 25px 10px 10px 10px;
display: flex;
flex-direction: column;
align-items: center;
border: solid black;
border-radius: 30px;
width:100%;
font-size: 2em;
color: ${colors.secondary};  
  @media (max-width: 800px) {
    font-size: 1.8em; 
  }
`
export const LabelImg = styled.label`
  background: #efefef;
  color: black;
  padding: 0 7px 4px 7px;
  font-size: 0.8em;
  border: 1px solid grey;
  border-radius: 3px;
`
export const Carte = styled.div`
  word-break: break-word;
  position: relative;
  width: 100%;
  max-width: 800px;
  padding: 0 10px;
  margin: 15px 0;
`
export const PostDiv = styled.div`
  padding: 25px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid;
  border-radius: 30px;
`
export const PostCross = styled.button`
  cursor: pointer;
  background: none;
  border: 0px;
  position: absolute;
  right: 22px;
  top: 15px;
  font-size: 25px;
  color: ${colors.secondary};
`
export const PostImg = styled.img`
  max-width: 250px;
  @media (max-width: 800px) {
    max-width: 220px;
  }
`
export const Text = styled.p`
  text-align: center;
  font-weight: normal;
  font-size: 2em;
  color: ${colors.secondary};
  @media (max-width: 800px) {
    font-size: 1.8em;
  }
`
export const ProfileText = styled.p`
  text-align: center;
  font-weight: normal;
  font-size: 2em;
  color: ${colors.secondary};
  @media (max-width: 800px) {
    font-size: 1.8em;
    max-width: 250px;
    word-break: break-word;
  }
`
export const Form = styled.form`
  padding: 20px;
  font-size: 2em;
  color: ${colors.secondary};
  @media (max-width: 800px) {
    font-size: 1.8em; 
  }
`
export const ResText = styled.p`
  text-align: center;
  font-size: 1.3em;
  white-space: pre-wrap;
  color: darkRed;
`

//Spin loader
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
//Animation du spinloader
export const Loader = styled.div`
  border: 6px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`
//Mise en forme lisible de l'horodatage reçu de la base de donnée
export function formatDate(object) {
  if (object.length) {
    const j = object.length
    for (let i=0; i<j; i++){
      object[i].createdAt = object[i].createdAt.substring(0,10) + " à " + object[i].createdAt.substring(11,16)
    }
  } else {
    object.createdAt = object.createdAt.substring(0,10) + " à " + object.createdAt.substring(11,16)
  }
}