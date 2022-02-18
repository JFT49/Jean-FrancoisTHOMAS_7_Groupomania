import styled, { keyframes } from 'styled-components'
import colors from './Colors'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
export const Loader = styled.div`
  padding: 10px;
  border: 6px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.backgroundLight};
`

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