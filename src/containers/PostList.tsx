import React, { useState } from 'react'
import Post from '../components/Post'
import useAxios from '../hooks/useAxios'
import { RedditResponse } from '../types/redditTypes'
import styled from 'styled-components'
import PageButtons from '../components/PageButtons'

const PostsContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`

const PostList = () => {
  const [pageCount, setPageCount] = useState(0)
  const [subreddit, setSubbreddit] = useState('javascript')
  const [url, setUrl] = useState(`https://www.reddit.com/r/${subreddit}.json?limit=10`)
  const { isLoading, hasError, response } = useAxios<RedditResponse>(url)
  const hasPosts = !!response && !!response.data.children.length
  const getFirstPost = hasPosts ? response?.data.children[0].data.name : null
  const getLastPost = hasPosts ? response?.data.children[response.data.children.length - 1].data.name : null

  const onClickNext = () => {
    setPageCount((prevState) => prevState + 1)
    if (getLastPost) {
      setUrl(`https://www.reddit.com/r/${subreddit}.json?limit=10&after=${getLastPost}`)
    }
  }
  const onClickPrev = () => {
    setPageCount((prevState) => prevState - 1)
    if (getFirstPost) {
      setUrl(`https://www.reddit.com/r/${subreddit}.json?limit=10&before=${getFirstPost}`)
    }
  }

  return (
    <>
      <PageButtons isLoading={isLoading} pageCount={pageCount} onClickNext={onClickNext} onClickPrev={onClickPrev} />
      {isLoading && <p>Loading</p>}
      {hasError && <p>Error</p>}
      {!isLoading && !hasError && response && hasPosts && (
        <PostsContainer>
          {response.data.children
            .filter((c) => !c.data.stickied)
            .map((c) => (
              <Post c={c} key={c.data.id} />
            ))}
        </PostsContainer>
      )}
      {hasPosts && !isLoading && (
        <PageButtons isLoading={isLoading} pageCount={pageCount} onClickNext={onClickNext} onClickPrev={onClickPrev} />
      )}
    </>
  )
}

export default PostList
