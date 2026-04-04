import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Success from './pages/Success'
import Fail from './pages/Fail'
import Tokens from './pages/Tokens'
import App from './App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'success.html',
        element: <Success />,
      },
      {
        path: 'fail.html',
        element: <Fail />,
      },
      {
        path: 'tokens.html',
        element: <Tokens />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
