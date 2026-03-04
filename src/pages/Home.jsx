import { Link } from "react-router-dom"
import useReceitas from '../hooks/useListaReceitas'

const Home = () => {
    const {listaReceitas, confirmarApagar} = useReceitas()

    const listarReceita = (receita) => {
        const {id, nome,} = receita
        return(
            <li key={id}>
                Nome: {nome}
                <Link to={`/receita/${id}`}>Detalhes</Link>
                <Link to={`/editar/${id}`}>Editar</Link>
                <button onClick={() => confirmarApagar(id)}>Apagar Receita</button>
            </li>
        )
    }

    

    return (
        <div>
            <Link to={`/adicionar`}>Adicionar Nova Receita</Link>

            <ul>
                {listaReceitas.map((receita) => {
                    return listarReceita(receita)
                })}
            </ul>
        </div>
    )
}

export default Home