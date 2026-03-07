import { Link } from "react-router-dom"
import useListaReceitas from '../hooks/useListaReceitas'
import tipoLista from "../data/tipo"
import categoriasLista from "../data/categorias"

const Home = () => {
    const {listaReceitas, listaFiltrada, loading, confirmarApagar, setPesquisa, tipoFiltro, setTipoFiltro, categoriaFiltro, setCategoriaFiltro} = useListaReceitas()

    if (loading){
        return <p>A carregar receitas...</p>
    }

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

            <div>
                <label htmlFor="pesquisar-input">Pesquisar por nome: </label>
                <input type="text" id="pesquisar-input" onChange={(e) => setPesquisa(e.target.value)}/>

                <label htmlFor="tipo-select">Filtrar por tipo: </label>
                <select id="tipo-select" value={tipoFiltro} onChange={event => setTipoFiltro(Number(event.target.value))}>
                    <option key="0" value="0">Nenhum filtro</option>
                    {tipoLista.map((t) => {
                            return (<option key={t.id} value={t.id}>
                                        {t.nome}
                                    </option>)
                        })}
                </select>

                <label htmlFor="categoria-select">Filtrar por categoria:</label>
                <select id="categoria-select" value={categoriaFiltro} onChange={event => setCategoriaFiltro(Number(event.target.value))}>
                    <option key="0" value="0">Nenhum filtro</option>
                    {categoriasLista.map(c => {
                        return (
                        <option key={c.id} value={c.id}>
                            {c.nome}
                        </option>)
                    })}
                </select>
            </div>
            

            {listaReceitas.length == 0 && <p>Livro sem receitas!</p>}


            
            {(listaFiltrada.length == 0 && listaReceitas.length !== 0) ? (
                <p>Não existe receitas com esses filtros</p>
            ) : (
                <ul>
                    {listaFiltrada.map((receita) => {
                        return listarReceita(receita)
                    })}
                </ul>
            )}
        </div>
    )
}

export default Home