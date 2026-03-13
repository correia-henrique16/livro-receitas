import "./styles/capa.css"
import { Link } from 'react-router-dom'
import setaPreta from "./imgs/black-arrow.png"

function App() {

  return (
    <>
      <div class = "container-capa">
        <div class="capa-livro">
          <h1>Livro de Receitas</h1>
          <p>As nossas melhores receitinhas humildes</p>
          <Link to={"/home"} class="avancar-link">
            <img src={setaPreta} alt="Seta para a direita" />
          </Link>
        </div>
      </div>
      
    </>
  )
}

export default App
