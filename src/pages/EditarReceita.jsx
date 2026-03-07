import { useParams, useNavigate } from 'react-router-dom'
import useListaReceitas from '../hooks/useListaReceitas'
import useReceita from "../hooks/useReceita"
import { useEffect } from 'react'
import tipoLista from '../data/tipo'
import useFiltros from '../hooks/useFiltros'
import categoriasLista from '../data/categorias'

const EditarReceita = () => {
    const {id} = useParams()

    const navigate = useNavigate()
    
    const {listaReceitas, loading, editarReceita} = useListaReceitas()
    

    const receitaEditar = listaReceitas.find(receita => receita.id == id)


    const {nome, setNome,
        ingredientes, setIngredientes,
        preparacao, setPreparacao,
        tipo, setTipo,
    } = useReceita(receitaEditar || {})

    const {categoriaSelecionadas, setCategoriasSelecionadas, checkBoxClick} = useFiltros()


    // para preencher os campos assim que carregar a receita, para aparecerem escritos nos inputs
    useEffect(() => {
        if(receitaEditar) {
            setNome(receitaEditar.nome)
            setIngredientes(receitaEditar.ingredientes)
            setPreparacao(receitaEditar.preparacao)
            setTipo(receitaEditar.tipo)
            setCategoriasSelecionadas(receitaEditar.categorias)
        }
    }, [receitaEditar])

    if(loading){
        return <p>A carregar...</p>
    }

    if (!receitaEditar) {
        return <p>Receita não existente!!</p>
    }


    const editarClick = (e) => {
        e.preventDefault()

        editarReceita(id, {
            nome,
            ingredientes,
            preparacao,
            tipo,
            categorias: categoriaSelecionadas})

        alert('Receita Editada!')
        navigate('/')
    }


    return(
        <div>
            <button onClick={() => navigate(-1)}>Voltar</button>
            <h2>Editar Receita</h2>
            <form onSubmit={editarClick}>
            
                <div>
                    <label htmlFor="input-nome">Nome: </label>
                    <input type="text" maxLength="40" id="input-nome" value={nome} onChange={event => setNome(event.target.value)}/>
                </div>

                <div>
                    <label htmlFor="input-ingredientes">Ingredientes: </label>

                    <textarea id="input-ingredientes" 
                    value={ingredientes} placeholder="1 cenoura...."
                    onChange={event => setIngredientes(event.target.value)}></textarea>
                </div>

                <div>
                    <label htmlFor="input-preparacao">Preparação: </label>

                    <textarea id="input-preparacao"
                        value={preparacao} placeholder="Mexer bem..."
                        onChange={event => setPreparacao(event.target.value)}></textarea>
                </div>

                <div>
                    <label htmlFor="tipo-select">Tipo: </label>
                    <select id="tipo-select" value={tipo} onChange={event => setTipo(Number(event.target.value))}>
                        {tipoLista.map((t) => {
                            return (<option key={t.id} value={t.id}>
                                        {t.nome}
                                    </option>)
                        })}
                    </select>
                </div>

                <div>
                    <label>Categoria: </label>
                    {categoriasLista.map((c) => {
                        return(
                            <label key={c.id} htmlFor={c.id}>
                                <input type='checkbox' checked={categoriaSelecionadas.includes(c.id)} onChange={() => checkBoxClick(c.id)} id={c.id} />
                                {c.nome}
                            </label>
                        )
                    })}
                </div>


                <button type="submit">Editar</button>
            </form>
        </div>
        
    )
}

export default EditarReceita