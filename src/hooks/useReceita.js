import { use, useState } from "react"

const useReceita = (receitaEditar = {}) => { 
    //se receber receita usa, senao segue
    const [nome, setNome] = useState(receitaEditar.nome || '')
    const [ingredientes, setIngredientes] = useState(receitaEditar.ingredientes || '')
    const [preparacao, setPreparacao] = useState(receitaEditar.preparacao || '')
    const [tipo, setTipo] = useState(receitaEditar.tipo || 1)
    const [fotoBase64, setFotoBase64] = useState('')

    return {
        nome, setNome,
        ingredientes, setIngredientes,
        preparacao, setPreparacao,
        tipo, setTipo,
        fotoBase64, setFotoBase64,
    }
}

export default useReceita