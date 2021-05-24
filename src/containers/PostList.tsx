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
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  appearance: none;
  background-color: #f6f7f8;
  border-radius: 4px;
  border: 1px solid #edeff1;
  box-shadow: none;
  color: #1c1c1c;
  display: block;
  height: 36px;
  outline: none;
  padding: 0 16px 0 16px;
  &:hover,
  &:focus {
    background-color: #fff;
    border: 1px solid #0079d3;
  }
`
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`
const StateWrapper = styled.p`
  display: flex;
  justify-content: center;
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
      {isLoading && <StateWrapper>Loading</StateWrapper>}
      {hasError && <StateWrapper>Error</StateWrapper>}
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
