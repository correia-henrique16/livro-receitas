import { useState } from "react"

const useReceita = (receitaEditar = {}) => { 
    //se receber receita usa, senao segue
    const [nome, setNome] = useState(receitaEditar.nome || '')
    const [ingredientes, setIngredientes] = useState(receitaEditar.ingredientes || '')
    const [preparacao, setPreparacao] = useState(receitaEditar.preparacao || '')

    return {
        nome, setNome,
        ingredientes, setIngredientes,
        preparacao, setPreparacao,
    }
}

export default useReceita