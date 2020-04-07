import React from 'react'
import styled from 'styled-components'

const PostWrapper = styled.div`
  width:100%;
  display:flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #4472C4;
  margin: 3% 0;
`
const PostHeader = styled.div`
  background-color: #4472C4;
  color: white;
  border-radius: 5px 5px 0 0;
  height:30px;
  font-size:1.1rem;
`
const PostContent = styled.div`
  min-height:80px;
  word-wrap:break-word;
`
const PostActions = styled.div`
  background-color:#4472C4;
  color:white;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding: 0 10px;
  height:30px;
`
const FaWrapper = styled.span`
  color: ${props => props.inputColor || "white"};
  margin: 0 3px;
  font-size:1.1rem;
  cursor: pointer;
  &:last-of-type{
    margin-right: 6px;
  }
`

export default function Post(props) {

  const { content } = props

  let colorLike, colorDislike
  switch (content.userVoteDirection) {
    case -1:
      colorLike = false
      colorDislike = '#ff5233'
      break;

    case 0:
      colorLike = false
      colorDislike = false
      break;

    case 1:
      colorDislike = false
      colorLike = '#6fb94f'
      break;

    default:
      colorLike = false
      colorDislike = false
      break;
  }

  return (
    <PostWrapper>
      <PostHeader>
        {content.title ?
          <>
            {content.username} <em> - {content.title}</em>
          </> :
          <>
            {content.username}
          </>
        }
      </PostHeader>
      <PostContent >
        {content.text}
      </PostContent>
      <PostActions>
        <span>
          <FaWrapper className="fa fa-thumbs-up" inputColor={colorLike} aria-hidden="true" onClick={props.onClickLike} ></FaWrapper>
          <FaWrapper className="fa fa-thumbs-down" inputColor={colorDislike} aria-hidden="true" onClick={props.onClickDislike}></FaWrapper>
          {content.votesCount || 0}
        </span>
        {content.commentsCount !== undefined &&
          <span>
            <FaWrapper className="fa fa-commenting" aria-hidden="true" onClick={props.onClickComment}></FaWrapper>
            {content.commentsCount}
          </span>}
      </PostActions>
    </PostWrapper>
  )
}
