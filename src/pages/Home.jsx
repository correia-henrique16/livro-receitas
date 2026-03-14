import { Link } from "react-router-dom"
import useListaReceitas from '../hooks/useListaReceitas'
import Slide from "../components/Slide"
import Filtros from "../components/Filtros"
import { useState } from "react"

const Home = () => {
    const {listaReceitas, listaFiltrada, setPesquisa, tipoFiltro, setTipoFiltro, categoriaFiltro, setCategoriaFiltro, loading} = useListaReceitas()
    const [estadoFiltros, setEstadoFiltros] = useState(false)

    const mostrarFiltros = () => {
        if (estadoFiltros == false){
            setEstadoFiltros(true)
        } else {setEstadoFiltros(false)}
    }


    return (
        <div className = "container-capa">
            <div className="capa-livro-aberto">
                <div className="folha-livro">

                    <Link to={`/adicionar`} className="link" id="link-adicionar">Adicionar Nova Receita</Link>

                    <section className="section-filtros">
                        <button onClick={() => mostrarFiltros()} className="btn-filtrar">Filtrar</button>
                        
                        {estadoFiltros == true && (
                            <Filtros
                                setPesquisa={setPesquisa}
                                setTipoFiltro={setTipoFiltro}
                                setCategoriaFiltro={setCategoriaFiltro}
                                tipoFiltro={tipoFiltro}
                                categoriaFiltro={categoriaFiltro}
                            />
                        )}
                        
                    </section>
                    
                    
                    {listaReceitas.length == 0 && <p>Livro sem receitas!</p>}


                    
                    {(listaFiltrada.length == 0 && listaReceitas.length !== 0) ? (
                        <p>Não existe receitas com esses filtros</p>
                    ) : (
                        <Slide 
                            listaFiltrada={listaFiltrada}
                            loading={loading}
                        />
                    )}
            </div>
            </div>
        </div>
    )
}

export default Home