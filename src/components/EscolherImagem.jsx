import { useState, useEffect } from "react"
import imageCompression from 'browser-image-compression';

const EscolherImagem = ({onImagem, imagemInicial = null}) => {
    const [preview, setPreview] = useState(imagemInicial)
    const [aCarregar, setCarregar] = useState(false)

    useEffect(() => {
        setPreview(imagemInicial);
    }, [imagemInicial]);

    const processarImagem = async (event) => {
        const ficheiroImagem = event.target.files[0]

        if (!ficheiroImagem) return

        setCarregar(true)

        const opcoes = {
            maxSizeMB: 0.1,
            maxWidthHeight: 800,
            useWebWorker: true,
        }

        try{
            const ficheiroComprimido = await imageCompression(ficheiroImagem, opcoes)
            const reader = new FileReader()
            reader.readAsDataURL(ficheiroComprimido)
            reader.onloadend = () => {
                const base64data = reader.result
                setPreview(base64data)
                onImagem(base64data)
                setCarregar(false)

                event.target.value = ""
            }

        } catch(erro) {
            console.error(erro)
            setCarregar(false)
        }

    }

    return(
        <div>
            <label htmlFor="input-img">
                {aCarregar ? "A carregar..." : "Escolher Imagem"}
                <input type="file" accept='image/*' id="input-img"
                onChange={processarImagem}
                style={{display: "none"}}/>
            </label>

            {preview && (
                <div>
                    <img src={preview} alt="Preview Imagem"/>
                    <button type="button" onClick={() => { setPreview(null); onImagem(''); }}>Remover</button>
                </div>
        )   }
        </div>
    )
}

export default EscolherImagem