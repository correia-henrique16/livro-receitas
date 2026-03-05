import { useState, useEffect } from "react"
import { db } from "../firebase"
import { addDoc, collection, deleteDoc, onSnapshot, updateDoc, doc } from "firebase/firestore"

const useListaReceitas = () => {
    // meter os usestates da lista
    // tipo useEffect, e as funçoes CRUD
    const [listaReceitas, setListaReceitas] = useState([])

    const [loading, setLoading] = useState(true)

    const colecao = collection(db, "receitas")

    useEffect(() => {

        const comunicarBd = onSnapshot(colecao, (querySnapshot) => {
            const receitasCloud = querySnapshot.docs.map(receita => ({
                id: receita.id,
                ...receita.data()
                // nome: receita.nome,
                // ingredientes: receita.ingredientes,
                // preparacao: receita.preparacao
            }))

            setListaReceitas(receitasCloud)
            setLoading(false)
        }, (erro) => {
            console.error("Erro: ", erro)
            setLoading(false)
        })

        return () => comunicarBd()
        // localStorage.setItem('listaReceitas', JSON.stringify(listaReceitas))
    }, [])


    const adicionarReceita = async (nome, ingredientes, preparacao) => {
        try{
            const novaReceita = {
            // id: self.crypto.randomUUID(),
            nome: nome,
            ingredientes: ingredientes,
            preparacao: preparacao,
            }

            await addDoc(colecao, novaReceita)
        }catch(erro){
            console.error("Erro: ", erro)
        }
        
        // setListaReceitas([...listaReceitas, novaReceita])
    }

    const apagarReceita = async (id) => {
        try{
            const receitaCloud = doc(db, "receitas", id)
            
            await deleteDoc(receitaCloud)
        } catch (erro) {
            console.error("Erro: ", erro)
        }
        

        // const listaAtualizada = listaReceitas.filter((receita) => receita.id !== id)
        // setListaReceitas(listaAtualizada)
    }

    const confirmarApagar = (id) => {
        if (confirm('Deseja apagar a receita da lista??')) {
            apagarReceita(id)
        }
    }

    const editarReceita = async(id, dadosReceita) => {
        try{
            const receitaCloud = doc(db, "receitas", id)

            await updateDoc(receitaCloud, dadosReceita)
        } catch (erro) {
            console.log("Erro: ", erro)
        }
        // const listaAtualizada = listaReceitas.map(receita => receita.id = id
        //     ? {...receita, ...dadosReceita} : receita
        // )
        // setListaReceitas(listaAtualizada)
    }

    return{
        listaReceitas,
        adicionarReceita,
        confirmarApagar,
        editarReceita,
        loading
    }
        
}

export default useListaReceitas