import tipoLista from "../data/tipo"
import categoriasLista from "../data/categorias"

const Filtros = ({setPesquisa, setTipoFiltro, setCategoriaFiltro, tipoFiltro, categoriaFiltro}) => {
    return(
        <>
            <div className="filtro-component">
                <input className="filtro-selecionar" placeholder="Filtrar por nome" type="text" id="pesquisar-input" onChange={(e) => setPesquisa(e.target.value)}/>
            </div>
            
            <div className="filtro-component">
                <label htmlFor="tipo-select">Tipo </label>
                <select className="filtro-selecionar" id="tipo-select" value={tipoFiltro} onChange={event => setTipoFiltro(Number(event.target.value))}>
                    <option key="0" value="0">Nenhum filtro</option>
                    {tipoLista.map((t) => {
                            return (<option key={t.id} value={t.id}>
                                        {t.nome}
                                    </option>)
                        })}
                </select>
            </div>
            
            <div className="filtro-component">
                <label htmlFor="categoria-select">Categoria</label>
                <select className="filtro-selecionar" id="categoria-select" value={categoriaFiltro} onChange={event => setCategoriaFiltro(Number(event.target.value))}>
                    <option key="0" value="0">Nenhum filtro</option>
                    {categoriasLista.map(c => {
                        return (
                        <option key={c.id} value={c.id}>
                            {c.nome}
                        </option>)
                    })}
                </select>
            </div>      
        </>
    )
}

export default Filtros