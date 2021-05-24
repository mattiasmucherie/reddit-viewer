import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import { mockDataResponse, mockDataResponsePage2, mockDataSwedenPost } from './mock/mockDataResponse'

const server = setupServer(
  rest.get('https://www.reddit.com/r/javascript.json', (req, res, ctx) => {
    const query = req.url.searchParams
    const after = query.get('after')
    if (after === 't3_nj93v1') {
      return res(ctx.status(200), ctx.json(mockDataResponsePage2))
    }
    return res(ctx.status(200), ctx.json(mockDataResponse))
  }),
  rest.get('https://www.reddit.com/r/sweden.json', (req, res, ctx) => {
    const query = req.url.searchParams
    const limit = query.get('limit')
    if (limit === '10') {
      return res(ctx.status(200), ctx.json(mockDataSwedenPost))
    }
    return res(ctx.status(404))
  }),

  rest.get('*', (req, res, ctx) => {
    console.error(`Add request handler for  ${req.url.toString()}`)
    return res(ctx.status(404), ctx.json({ error: 'Please add request handler' }))
  })
)

const RealDate = Date.now
beforeAll(() => {
  server.listen()
  global.Date.now = () => new Date('2021-05-23T22:20:30Z').getTime()
})
afterAll(() => {
  global.Date.now = RealDate
  server.close()
})
afterEach(() => server.resetHandlers())

export { server, rest }
