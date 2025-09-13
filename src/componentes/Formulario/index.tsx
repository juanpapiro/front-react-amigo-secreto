import { useRef, useState } from "react"
import { useAdicionarParticipante } from "../../state/hook/useAdicionarParticipante";
import { useMensagemErro } from "../../state/hook/useMensagemErro";

import './style.css'

export const Formulario = () => {

    const [nome, setNome] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const adicionarNaLista = useAdicionarParticipante();

    const mensagemErro = useMensagemErro();

    const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        adicionarNaLista(nome);
        setNome('');
        inputRef.current?.focus();
    }


    return(
        <form onSubmit={adicionarParticipante}>
            <div className="grupo-input-btn">    
                <input 
                    ref={inputRef}
                    value={nome} 
                    onChange={evento => setNome(evento.target.value)}
                    type="text" 
                    placeholder="Insira os nomes dos participantes."
                />
                <button type="submit" disabled={!nome}>Adicionar</button>
                {mensagemErro && <p className="alerta erro" role="alert">{mensagemErro}</p>}
            </div>
        </form>
    )


}