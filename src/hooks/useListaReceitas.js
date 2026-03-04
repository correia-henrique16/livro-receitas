import { useState, useEffect } from "react"
import useReceita from "./useReceita"

const useListaReceitas = () => {
    // meter os usestates da lista
    // tipo useEffect, e as funçoes CRUD
    const [listaReceitas, setListaReceitas] = useState(() => {
        const dados = localStorage.getItem('listaReceitas')
        return dados ? JSON.parse(dados) : []
    })

    useEffect(() => {
        localStorage.setItem('listaReceitas', JSON.stringify(listaReceitas))
    }, [listaReceitas])


    const adicionarReceita = (nome, ingredientes, preparacao) => {
        const novaReceita = {
            id: self.crypto.randomUUID(),
            nome: nome,
            ingredientes: ingredientes,
            preparacao: preparacao,
        }

        setListaReceitas([...listaReceitas, novaReceita])
    }

    const apagarReceita = (id) => {
        const listaAtualizada = listaReceitas.filter((receita) => receita.id !== id)
        setListaReceitas(listaAtualizada)
    }

    const confirmarApagar = (id) => {
        if (confirm('Deseja apagar a receita da lista??')) {
            apagarReceita(id)
        }
    }

    const editarReceita = (id, dadosReceita) => {
        const listaAtualizada = listaReceitas.map(receita => receita.id = id
            ? {...receita, ...dadosReceita} : receita
        )
        setListaReceitas(listaAtualizada)
    }

    return{
        listaReceitas,
        adicionarReceita,
        confirmarApagar,
        editarReceita,
    }
        
}

export default useListaReceitas