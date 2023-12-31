import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import Profile from './pages/Profile'
import { GlobalStyle } from './components/Styles/Global.tsx'
import { ThemeProvider } from 'styled-components'
import { theme } from './components/Styles/Theme.tsx'
import Login from './pages/Login/index.tsx'
import SignIn from './pages/SignIn/index.tsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signin',
        element: <SignIn />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <GlobalStyle />
      <RouterProvider router={routes} />
    </ThemeProvider>
  </React.StrictMode>,
)
