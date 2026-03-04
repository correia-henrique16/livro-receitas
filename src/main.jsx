import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
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
    <h1>Livro de Receitas</h1>
    <RouterProvider router={router} />
  </StrictMode>,
)
