import React, { useState } from 'react'
import { RedditChild } from '../types/redditTypes'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

const Card = styled.li`
  border-radius: 4px;
  background: #fff;
  padding: 10px;
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
  padding-left: 10px;
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
  color: #000;
  font-size: 16px;
  font-weight: bold;
`
const AuthorAndDate = styled.div`
  display: flex;
  justify-content: flex-end;
  & > h6 {
    margin: 0;
    padding: 0 5px;
  }
`
const LinkContainer = styled.div`
  color: #888;
  font-size: 10px;
  font-weight: bold;
`
const Permalink = styled.a`
  margin: 10px 10px 10px 0;
  color: inherit;
  text-decoration: none;
  display: inline-block;
`
const ExpandButton = styled.button`
  border: none;
  background: inherit;
  color: inherit;
  font-weight: inherit;
  font-size: inherit;
  cursor: pointer;
  padding: 0;
  margin: 10px 10px 10px 0;
`
const ExpandedContainer = styled.div`
  max-width: 100%;
  overflow: scroll;
  margin-left: 80px;
`

interface PostProps {
  c: RedditChild
}

const Post: React.VFC<PostProps> = ({ c }) => {
  const [expanded, setExpanded] = useState(false)
  const thumbnail = c.data.thumbnail !== 'self' ? c.data.thumbnail : 'https://via.placeholder.com/140?text=selfpost'
  const toggleExpanded = () => {
    setExpanded((prevState) => !prevState)
  }
  return (
    <Card data-testid={`post-card-${c.data.id}`}>
      <CardContainer>
        <FirstColumn>
          <Score>{c.data.score}</Score>
          {c.data.thumbnail && <Thumbnail src={thumbnail} alt="Thumbnail for post" />}
        </FirstColumn>
        <SecondColumn>
          <LinkContainer>
            <PostTitle>{c.data.title}</PostTitle>
            {c.data.selftext && (
              <ExpandButton onClick={toggleExpanded}>{expanded ? 'Close' : 'Show'} self text</ExpandButton>
            )}
            <Permalink href={`https://old.reddit.com${c.data.permalink}`} target="_blank" rel="noopener noreferrer">
              Got to post
            </Permalink>
            <Permalink href={`https://old.reddit.com${c.data.permalink}`} target="_blank" rel="noopener noreferrer">
              {c.data.num_comments} {c.data.num_comments === 1 ? 'comment' : 'comments'}
            </Permalink>
          </LinkContainer>
          <AuthorAndDate>
            <h6>By: {c.data.author}</h6>
            <h6>{new Date(c.data.created * 1000).toLocaleString()}</h6>
          </AuthorAndDate>
        </SecondColumn>
      </CardContainer>
      {expanded && c.data.selftext && (
        <ExpandedContainer>
          <ReactMarkdown>{c.data.selftext}</ReactMarkdown>
        </ExpandedContainer>
      )}
    </Card>
  )
}

export default Post
