import { useParams, useNavigate } from 'react-router-dom'
import useListaReceitas from '../hooks/useListaReceitas'
import useReceita from "../hooks/useReceita"
import { useEffect } from 'react'

const EditarReceita = () => {
    const {id} = useParams()

    const navigate = useNavigate()
    
    const {listaReceitas, loading, editarReceita} = useListaReceitas()

    

    const receitaEditar = listaReceitas.find(receita => receita.id == id)


    const {nome, setNome,
        ingredientes, setIngredientes,
        preparacao, setPreparacao
    } = useReceita(receitaEditar || {})


    // para preencher os campos assim que carregar a receita, para aparecerem escritos nos inputs
    useEffect(() => {
        if(receitaEditar) {
            setNome(receitaEditar.nome)
            setIngredientes(receitaEditar.ingredientes)
            setPreparacao(receitaEditar.preparacao)
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

        editarReceita(id, {nome, ingredientes, preparacao})

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


                <button type="submit">Editar</button>
            </form>
        </div>
        
    )
}

export default EditarReceita