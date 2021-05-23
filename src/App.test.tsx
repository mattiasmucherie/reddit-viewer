import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import { rest, server } from './setupTests'

test('renders 10 posts', async () => {
  render(<App />)
  const posts = await screen.findAllByTestId(/post-card-/i)
  expect(posts).toHaveLength(10)
})

test('render next page when clicking next', async () => {
  render(<App />)
  await screen.findAllByTestId(/post-card-/i)
  const firstPostFirstPage = screen.getByRole('heading', {
    name: /zap\-db: we made a json based database written in typescript and running on node, especially suited to slack\/discord bots and works great as a replacement to json blobs :\)/i,
  })
  expect(firstPostFirstPage).toBeInTheDocument()

  const viewMore = screen.getAllByText(/view more:/i)[0]
  expect(viewMore).toBeInTheDocument()

  const nextButton = screen.getAllByRole('button', { name: /next/i })[0]
  fireEvent.click(nextButton)
  await screen.findAllByTestId(/post-card-/i)
  const firstPostSecondPage = screen.getByRole('heading', {
    name: /it's cool to play elastic man/i,
  })
  const prevButton = screen.getAllByRole('button', { name: /prev/i })[0]
  expect(firstPostSecondPage).toBeInTheDocument()
  expect(prevButton).toBeInTheDocument()
})

test('render sweden posts', async () => {
  render(<App />)
  await screen.findAllByTestId(/post-card-/i)
  const firstPostFirstPage = screen.getByRole('heading', {
    name: /zap\-db: we made a json based database written in typescript and running on node, especially suited to slack\/discord bots and works great as a replacement to json blobs :\)/i,
  })
  expect(firstPostFirstPage).toBeInTheDocument()

  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: 'sweden' } })
  await screen.findByText(/Loading/i)
  await screen.findAllByTestId(/post-card-/i)
  const firstSwedishPost = screen.getByRole('heading', {
    name: /get killing!/i,
  })
  expect(firstSwedishPost).toBeInTheDocument()
})

test('render error on fetch', async () => {
  const original = console.error
  console.error = jest.fn()
  server.use(
    rest.get('https://www.reddit.com/r/javascript.json', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )
  render(<App />)
  const errorElement = await screen.findByText(/Error/i)
  console.error = original
  expect(errorElement).toBeInTheDocument()
})
