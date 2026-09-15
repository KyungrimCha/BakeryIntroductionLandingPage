import { createBrowserRouter } from 'react-router'
import Landing from './pages/Landing'
import Menu from './pages/Menu'

export const router = createBrowserRouter([
  { path: '/', Component: Landing },
  { path: '/menu', Component: Menu },
])
