import React from 'react'
import { RedditChild } from '../types/redditTypes'
import styled from 'styled-components'

const Card = styled.li`
  border-radius: 4px;
  background: #fff;
  padding: 5px;
  margin: 10px;
`
const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 10px;
  flex: 0 0 50px;
`
const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`

const Score = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`
const Thumbnail = styled.img`
  border-radius: 4px;
  width: 50px;
  align-self: center;
  padding-top: 20px;
`
const PostTitle = styled.h4`
  margin: 0;
`
const AuthorAndDate = styled.div`
  display: flex;
  justify-content: flex-end;
  & > h6 {
    margin: 0;
    padding: 0 5px;
  }
`

interface PostProps {
  c: RedditChild
}

const Post: React.VFC<PostProps> = ({ c }) => {
  const thumbnail = c.data.thumbnail !== 'self' ? c.data.thumbnail : 'https://via.placeholder.com/140?text=selfpost'
  console.warn(c.data.selftext)
  return (
    <Card>
      <CardContainer>
        <FirstColumn>
          <Score>{c.data.score}</Score>
          {c.data.thumbnail && <Thumbnail src={thumbnail} alt="Thumbnail for post" />}
        </FirstColumn>
        <SecondColumn>
          <PostTitle>{c.data.title}</PostTitle>
          <AuthorAndDate>
            <h6>By: {c.data.author}</h6>
            <h6>{new Date(c.data.created * 1000).toLocaleString()}</h6>
          </AuthorAndDate>
        </SecondColumn>
      </CardContainer>
    </Card>
  )
}

export default Post
