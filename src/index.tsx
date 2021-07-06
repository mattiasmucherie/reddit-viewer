import React from 'react'
import ReactDOM from 'react-dom'
import LogRocket from 'logrocket'
import './index.css'
import App from './App'

LogRocket.init('muodip/reddit-viewer')
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
