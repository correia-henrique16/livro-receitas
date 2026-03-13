import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Home from './pages/Home.jsx'
import App from './App.jsx'
import AdicionarReceita from './pages/AdicionarReceita.jsx'
import DetalhesReceita from './pages/DetalhesReceita.jsx'
import EditarReceita from './pages/EditarReceita.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/home",
    element: <Home />
  },

  {
    path: "/adicionar",
    element: <AdicionarReceita />
  },

  {
    path: "/editar/:id",
    element: < EditarReceita/>
  },

  {
    path: "/receita/:id",
    element: <DetalhesReceita />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
