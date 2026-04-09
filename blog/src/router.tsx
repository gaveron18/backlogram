import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import PostList from './pages/PostList'
import CategoryPage from './pages/CategoryPage'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <PostList />,
      },
      {
        path: 'category/:category',
        element: <CategoryPage />,
      },
      {
        path: 'admin',
        element: <Admin />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
