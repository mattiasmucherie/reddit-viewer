import React, { useState } from 'react'
import { RedditChild } from '../types/redditTypes'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import formatDistance from 'date-fns/formatDistance/index'

const Card = styled.li`
  border-radius: 4px;
  background: #fff;
  margin: 10px;
  border: 1px solid #ccc;
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
  flex: 0 0 40px;
  background: #f7f9fa;
  border-radius: 4px 0 0 4px;
`
const SecondColumn = styled.div`
  width: 100%;
  padding-top: 8px;
`

const Score = styled.p`
  font-size: 12px;
  font-weight: bold;
  margin: 0;
  padding: 18px 4px 8px 4px;
`
const Thumbnail = styled.img`
  border-radius: 4px;
  align-self: center;
  flex: 0 0 144px;
  padding: 20px 8px 0;
`
const TitleContainer = styled.div`
  margin: 0 8px;
`
const PostTitle = styled.h3`
  margin: 0;
  padding: 0;
  color: #000;
  font-size: 18px;
  font-weight: bold;
`
const AuthorAndDate = styled.div`
  margin: 0 8px 8px;
  & > span {
    margin: 0;
    color: #666;
    font-size: 12px;
    font-weight: 400;
  }
`
const TitleAndInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 22px;
  flex: 1 1 400px;
`
const LinkContainer = styled.div`
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  align-items: stretch;
  display: flex;
  flex-direction: row;
  padding: 0 8px;
`
const Link = styled.a`
  text-decoration: none;
  color: inherit;
`
const PostLink = styled(Link)`
  padding: 8px;
  text-decoration: none;
  display: inline-block;
  &:hover {
    background-color: rgba(26, 26, 27, 0.1);
  }
`
const ExpandButton = styled.button`
  border: none;
  background: inherit;
  color: inherit;
  font-weight: inherit;
  font-size: inherit;
  cursor: pointer;
  padding: 8px;
  &:hover {
    background-color: rgba(26, 26, 27, 0.1);
  }
`
const ExpandedContainer = styled.div`
  max-width: 100%;
  overflow: scroll;
  border-left: 40px solid #f7f9fa;
  border-radius: 0 0 0 4px;
  padding: 0 8px;
`
const Article = styled.article`
  padding-bottom: 8px;
  display: flex;
  flex-direction: row;
  flex: 1 1 160px;
  flex-wrap: wrap;
`

interface PostProps {
  c: RedditChild
}

const Post: React.VFC<PostProps> = ({ c }) => {
  const [expanded, setExpanded] = useState(false)
  const thumbnail = c.data.thumbnail && c.data.thumbnail !== 'self'
  const score = c.data.score >= 1000 ? `${(c.data.score / 1000).toFixed(1)}k` : c.data.score
  const date = formatDistance(new Date(c.data.created * 1000), new Date(Date.now()))

  const toggleExpanded = () => {
    setExpanded((prevState) => !prevState)
  }

  return (
    <Card data-testid={`post-card-${c.data.id}`}>
      <CardContainer>
        <FirstColumn>
          <Score>{score}</Score>
        </FirstColumn>
        <SecondColumn>
          <Article>
            <TitleAndInfoContainer>
              <AuthorAndDate>
                <span title={new Date(c.data.created * 1000).toLocaleString()}>
                  Posted by{' '}
                  <Link href={`https://old.reddit.com/user/${c.data.author}`} target="_blank" rel="noopener noreferrer">
                    u/{c.data.author}
                  </Link>{' '}
                  {date} ago
                </span>
              </AuthorAndDate>
              <TitleContainer>
                <Link href={`https://old.reddit.com${c.data.permalink}`} target="_blank" rel="noopener noreferrer">
                  <PostTitle>{c.data.title}</PostTitle>
                </Link>
              </TitleContainer>
            </TitleAndInfoContainer>
            {thumbnail && <Thumbnail src={c.data.thumbnail} alt="Thumbnail for post" />}
          </Article>

          <LinkContainer>
            {c.data.selftext && (
              <ExpandButton onClick={toggleExpanded}>{expanded ? 'Close' : 'Show'} self text</ExpandButton>
            )}
            <PostLink href={`https://old.reddit.com${c.data.permalink}`} target="_blank" rel="noopener noreferrer">
              {c.data.num_comments} {c.data.num_comments === 1 ? 'comment' : 'comments'}
            </PostLink>
          </LinkContainer>
        </SecondColumn>
      </CardContainer>
      {expanded && c.data.selftext && (
        <ExpandedContainer data-testid={`selftext-container-${c.data.id}`}>
          <ReactMarkdown>{c.data.selftext}</ReactMarkdown>
        </ExpandedContainer>
      )}
    </Card>
  )
}

export default Post
