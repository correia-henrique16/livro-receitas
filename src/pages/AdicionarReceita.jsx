import useListaReceitas from '../hooks/useListaReceitas'
import useReceita from "../hooks/useReceita"
import {useNavigate } from 'react-router-dom'
import tipoLista from '../data/tipo'
import categoriasLista from '../data/categorias'
import useFiltros from '../hooks/useFiltros'


const AdicionarReceita = () => {

    const {nome, setNome,
        ingredientes, setIngredientes,
        preparacao, setPreparacao,
        tipo, setTipo
    } = useReceita()

    const {adicionarReceita} = useListaReceitas()

    const {categoriaSelecionadas, checkBoxClick} = useFiltros()

    const navigate = useNavigate()

    const registarClick = (e) => {
        e.preventDefault()

        if (categoriaSelecionadas.length == 0) {
            alert("Precisa selecionar pelo menos uma categoria!")
            return
        }

        adicionarReceita(nome, ingredientes, preparacao, tipo, categoriaSelecionadas)

        alert('Receita Adicionada!')

        setNome('')
        setIngredientes('')
        setPreparacao('')

        navigate('/')
    }

    return (
        <div>
            <button onClick={()=> navigate(-1)}>Voltar</button>
            <h2>Adicionar Receita</h2>

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

                <div>
                    <label htmlFor="tipo-select">Tipo: </label>
                    <select id="tipo-select" value={tipo} onChange={event => setTipo(Number(event.target.value))}>
                        {tipoLista.map((t) => {
                            return (
                                <option key={t.id} value={t.id}>
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


                <button type="submit">Adicionar</button>
            </form>
        </div>
    )
}

export default AdicionarReceita