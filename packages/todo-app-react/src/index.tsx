import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@reach/router'
import { AppRoutes } from 'src/typings'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

interface Props {
  path: AppRoutes
}

const Controller: React.FC<Props> = ({ path }) => <App path={path} />

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Controller path={AppRoutes.ALL} />
      <Controller path={AppRoutes.ACTIVE} />
      <Controller path={AppRoutes.COMPLETED} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
