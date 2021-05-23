import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Post from '../Post'
import { mockDataPostNoSelf, mockDataPostSelf } from '../../mock/mockDataPost'

test('renders a post with selftext', () => {
  render(<Post c={mockDataPostSelf} />)
  const img = screen.getByRole('img', {
    name: /thumbnail for post/i,
  })
  const title = screen.getByRole('heading', {
    name: /would i need multiple \.js files for a website containing multiple games\?/i,
  })
  const showSelf = screen.getByRole('button', {
    name: /show self text/i,
  })
  const permalink = screen.getByRole('link', {
    name: /got to post/i,
  })

  const numberComments = screen.getByRole('link', {
    name: /27 comments/i,
  })
  const author = screen.getByRole('heading', {
    name: /by: thedeafvampire/i,
  })
  const createdDate = screen.getByRole('heading', {
    name: /5\/23\/2021, 11:32:31 pm/i,
  })
  expect(img).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(showSelf).toBeInTheDocument()
  expect(permalink).toBeInTheDocument()
  expect(numberComments).toBeInTheDocument()
  expect(author).toBeInTheDocument()
  expect(createdDate).toBeInTheDocument()
})

test('renders selftext when expanding', () => {
  render(<Post c={mockDataPostSelf} />)
  const showSelf = screen.getByRole('button', {
    name: /show self text/i,
  })
  fireEvent.click(showSelf)
  const selfText = screen.getByTestId('selftext-container-nj7u3w')
  expect(selfText).toBeInTheDocument()
})

test('renders a post without selftext', () => {
  render(<Post c={mockDataPostNoSelf} />)
  const showSelf = screen.queryByRole('button', {
    name: /show self text/i,
  })
  expect(showSelf).not.toBeInTheDocument()
})
