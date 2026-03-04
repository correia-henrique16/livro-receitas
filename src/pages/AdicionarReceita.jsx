import useListaReceitas from '../hooks/useListaReceitas'
import useReceita from "../hooks/useReceita"
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

const AdicionarReceita = () => {

    const {nome, setNome,
        ingredientes, setIngredientes,
        preparacao, setPreparacao
    } = useReceita()

    const {adicionarReceita} = useListaReceitas()

    const navigate = useNavigate()

    const registarClick = (e) => {
        e.preventDefault()

        adicionarReceita(nome, ingredientes, preparacao)

        setNome('')
        setIngredientes('')
        setPreparacao('')

        alert('Receita Adicionada!')
    }

    return (
        <div>
            <button onClick={()=> navigate(-1)}>Voltar</button>

            <form onSubmit={registarClick}>
                <div>
                    <label htmlFor="input-nome">Nome: </label>
                    <input type="text" maxLength="40" id="input-nome" required value={nome} onChange={event => setNome(event.target.value)}/>
                </div>

                <div>
                    <label htmlFor="input-ingredientes">Ingredientes: </label>

                    <textarea id="input-ingredientes" required 
                    value={ingredientes} placeholder="1 cenoura...."
                    onChange={event => setIngredientes(event.target.value)}></textarea>
                </div>

                <div>
                    <label htmlFor="input-preparacao">Preparação: </label>

                    <textarea id="input-preparacao" required
                     value={preparacao} placeholder="Mexer bem..."
                      onChange={event => setPreparacao(event.target.value)}></textarea>
                </div>


                <button type="submit">Adicionar</button>
            </form>
        </div>
    )
}

export default AdicionarReceita