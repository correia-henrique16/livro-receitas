import { useState, useEffect} from "react"
import { db } from "../firebase"
import { addDoc, collection, deleteDoc, onSnapshot, updateDoc, doc } from "firebase/firestore"

const useListaReceitas = () => {
    // meter os usestates da lista
    // tipo useEffect, e as funçoes CRUD
    const [listaReceitas, setListaReceitas] = useState([])

    const[pesquisa, setPesquisa] = useState('')
    const [tipoFiltro, setTipoFiltro] = useState(0)
    const [categoriaFiltro, setCategoriaFiltro] = useState(0)

    const [loading, setLoading] = useState(true)

    const colecao = collection(db, "receitas")

    useEffect(() => {

        const comunicarBd = onSnapshot(colecao, (querySnapshot) => {
            const receitasCloud = querySnapshot.docs.map(receita => ({
                id: receita.id,
                ...receita.data()
            }))

            setListaReceitas(receitasCloud)
            setLoading(false)
        }, (erro) => {
            console.error("Erro: ", erro)
            setLoading(false)
        })

        return () => comunicarBd()
    }, [])


    const adicionarReceita = async (nome, ingredientes, preparacao, tipo, listaCategorias, imagem) => {

        console.log(listaCategorias)
        try{
            const novaReceita = {
                nome: nome,
                ingredientes: ingredientes,
                preparacao: preparacao,
                tipo: tipo,
                categorias: listaCategorias,
                imagem: imagem,
            }

            await addDoc(colecao, novaReceita)
        }catch(erro){
            console.error("Erro: ", erro)
        }
    }

    const apagarReceita = async (id) => {
        try{
            const receitaCloud = doc(db, "receitas", id)
            
            await deleteDoc(receitaCloud)
        } catch (erro) {
            console.error("Erro: ", erro)
        }
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
    }



    const listaFiltrada = listaReceitas.filter((receita) => {
        const nome = receita.nome
        const pesquisaTrim = pesquisa.trim()
        const condicaoNome = pesquisaTrim == "" || nome.toLowerCase().includes(pesquisaTrim.toLowerCase()) // retorna True numa das duas ocasiões
        const condicaoTipo = tipoFiltro == 0 || receita.tipo == tipoFiltro // retorna True se o filtro for igual, ou se for 0 (sem filtro)
        const condicaoCategoria = categoriaFiltro == 0 || receita.categorias.includes(categoriaFiltro)

        return condicaoNome && condicaoTipo && condicaoCategoria
    })

    

    return{
        listaReceitas,
        setPesquisa,
        tipoFiltro, 
        setTipoFiltro,
        categoriaFiltro,
        setCategoriaFiltro,
        listaFiltrada,
        adicionarReceita,
        confirmarApagar,
        editarReceita,
        loading,
    }
        
}

export default useListaReceitas