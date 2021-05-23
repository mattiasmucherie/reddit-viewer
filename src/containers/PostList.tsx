import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import useAxios from '../hooks/useAxios'
import { RedditResponse } from '../types/redditTypes'
import styled from 'styled-components'
import PageButtons from '../components/PageButtons'
import useDebounce from '../hooks/useDebounce'

const PostsContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`
const SubredditInput = styled.input`
  width: 100%;
  max-width: 200px;
  font-family: inherit;
  padding: 0 0 2px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 20px;
  line-height: 18px;
  transition: box-shadow 0.1s ease-out 0s;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0;
`
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`
const POST_LIMIT = 10
const PostList = () => {
  const [pageCount, setPageCount] = useState(0)
  const [subreddit, setSubreddit] = useState('javascript')
  const [url, setUrl] = useState(`https://www.reddit.com/r/${subreddit}.json?limit=${POST_LIMIT}`)
  const { isLoading, hasError, response } = useAxios<RedditResponse>(url)
  const hasPosts = !!response && !!response.data.children.length
  const getFirstPost = hasPosts ? response?.data.children[0].data.name : null
  const getLastPost = hasPosts ? response?.data.children[response.data.children.length - 1].data.name : null
  const debouncedSearchTerm = useDebounce(subreddit, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      setUrl(`https://www.reddit.com/r/${debouncedSearchTerm}.json?limit=${POST_LIMIT}`)
    }
  }, [debouncedSearchTerm])

  const onClickNext = () => {
    setPageCount((prevState) => prevState + 1)
    if (getLastPost) {
      setUrl(`https://www.reddit.com/r/${subreddit}.json?limit=${POST_LIMIT}&after=${getLastPost}`)
    }
  }
  const onClickPrev = () => {
    setPageCount((prevState) => prevState - 1)
    if (getFirstPost) {
      setUrl(`https://www.reddit.com/r/${subreddit}.json?limit=${POST_LIMIT}&before=${getFirstPost}`)
    }
  }

  return (
    <>
      <InputContainer>
        <SubredditInput
          onChange={(e) => setSubreddit(e.target.value.toLowerCase())}
          value={subreddit}
          placeholder="Enter a subreddit"
        />
      </InputContainer>
      {!hasError && (
        <PageButtons isLoading={isLoading} pageCount={pageCount} onClickNext={onClickNext} onClickPrev={onClickPrev} />
      )}
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
      {hasPosts && !isLoading && !hasError && (
        <PageButtons isLoading={isLoading} pageCount={pageCount} onClickNext={onClickNext} onClickPrev={onClickPrev} />
      )}
    </>
  )
}

export default PostList
