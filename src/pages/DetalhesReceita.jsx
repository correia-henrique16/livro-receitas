import { useNavigate, useParams } from "react-router-dom"
import useListaReceitas from "../hooks/useListaReceitas"

const DetalhesReceita = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {listaReceitas} = useListaReceitas()


    const receitaMostrar = listaReceitas.find(receita => receita.id == id)

    const {nome, ingredientes, preparacao} = receitaMostrar
    const nomeMaiusculo = nome.toUpperCase()
    return(
        <div>
            <button onClick={() => navigate(-1)}>Voltar</button>

            <section>
                <h2>{nomeMaiusculo}</h2>

                <div>
                    <h3>Ingredientes</h3>
                    <p>{ingredientes}</p>
                </div>

                <div>
                    <h3>Preparação</h3>
                    <p>{preparacao}</p>
                </div>
                
            </section>
        </div>
    )
}

export default DetalhesReceita