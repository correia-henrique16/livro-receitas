import useListaReceitas from "../hooks/useListaReceitas"
import { useState } from "react"
import { Link } from "react-router-dom"
import setaDireita from "../imgs/black-arrow.png"
import setaEsquerda from "../imgs/black-arrow-left.png"
import noImage from "../imgs/no-image.png"

const Slide = ({listaFiltrada, loading}) => {

    const [marcador, setMarcador] = useState(0)

    const maximoIndice = listaFiltrada.length - 1
    const minimoIndice = 0

    const mudarReceita = (indice) => {
        if (indice == 1){
            setMarcador(marcador + 1)
        } else {
            setMarcador(marcador - 1)
        }

    }

    if (loading) {
        return <p>A carregar receitas...</p>
    }

    const listarReceita = (receita) => {
        const {id, nome, imagem} = receita

        return(
            <section key={id} className="section-receitas">
                
                {imagem !== '' ? (
                    <img src={imagem} alt="Imagem da receita" className="imagem"/>
                ) : (
                    <img src={noImage} alt="Sem imagem" className="imagem"/>
                )}
                
                
                <div className="nome-ver-mais">
                    <h4>{nome}</h4>
                    <Link to={`/receita/${id}`} className="link" id="link-detalhes">Ver detalhes</Link>
                </div>
                
                
                {marcador < maximoIndice && (
                    <button className="seta-direita seta" onClick={() => mudarReceita(1)}>
                        <img src={setaDireita} alt="Proxima receita" />
                    </button>
                )}

                {marcador > minimoIndice && (
                    <button className="seta-esquerda seta" onClick={() => mudarReceita(-1)}>
                        <img src={setaEsquerda} alt="Receita anterior" />
                    </button>
                )}
                

                
            </section>
        )
    }



    return listarReceita(listaFiltrada[marcador])
}

export default Slide