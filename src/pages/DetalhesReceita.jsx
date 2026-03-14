import { useNavigate, useParams } from "react-router-dom"
import useListaReceitas from "../hooks/useListaReceitas"
import tipoLista from "../data/tipo"
import categoriasLista from "../data/categorias"
import { Link } from "react-router-dom"
import noImage from "../imgs/no-image.png"

const DetalhesReceita = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {listaReceitas, loading, confirmarApagar} = useListaReceitas()

    if(loading){
        return <p>A carregar...</p>
    }

    const receitaMostrar = listaReceitas.find(receita => receita.id == id)

    if (!receitaMostrar) {
        return <p>Receita não existente!!</p>
    }
    
    const {nome, ingredientes, preparacao, tipo, categorias, imagem} = receitaMostrar
    const nomeMaiusculo = nome.toUpperCase()

    const tipoMostrar = tipoLista.find(t => t.id == tipo)

    const categoriasMostrar = categorias.map(cId => {
        return categoriasLista.find(cat => cat.id == cId)
    })


    return(
        <div>
            <button onClick={() => navigate(-1)}>Voltar</button>
            <Link to={`/editar/${id}`}>Editar</Link>

            <section>
                <h2>{nomeMaiusculo}</h2>

                {imagem !== '' ? (
                    <img src={imagem} alt="Imagem da receita" className="imagem"/>
                ) : (
                    <img src={noImage} alt="Sem imagem" className="imagem"/>
                )}
                

                <div>
                    <h3>Ingredientes</h3>
                    <p>{ingredientes}</p>
                </div>

                <div>
                    <h3>Preparação</h3>
                    <p>{preparacao}</p>
                </div>

                <div>
                    <h3>Tipo</h3>
                    <p>{tipoMostrar.nome}</p>
                </div>

                <div>
                    <h3>Categorias</h3>
                    <ul>
                        {
                            categoriasMostrar.map(cat => {
                                return (
                                    <li key={cat.id} >
                                        {cat.nome}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                
                <button onClick={() => confirmarApagar(id)}>Apagar Receita</button>

            </section>
        </div>
    )
}

export default DetalhesReceita