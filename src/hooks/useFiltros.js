import {useState } from 'react'

const useFiltros = () => {
    const [categoriaSelecionadas, setCategoriasSelecionadas] = useState([])

    const checkBoxClick = (id) => {
        if (categoriaSelecionadas.includes(id)) {
            setCategoriasSelecionadas(categoriaSelecionadas.filter(item => item !== id))
        } else {
            setCategoriasSelecionadas([...categoriaSelecionadas, id])
        }
    }


    return {
        categoriaSelecionadas, setCategoriasSelecionadas, checkBoxClick
    }
}

export default useFiltros
