import "./styles/capa.css"
import "./styles/folha.css"
import { Link } from 'react-router-dom'
import setaPreta from "./imgs/black-arrow.png"

function App() {

  return (
    <>
      <div className = "container-capa">
        <div className="capa-livro">
          <h1>Livro de Receitas</h1>
          <h2>As nossas melhores receitinhas humildes</h2>
          <Link to={"/home"} className="avancar-link">
            <img src={setaPreta} alt="Seta para a direita" />
          </Link>
        </div>
      </div>
      
    </>
  )
}

export default App
