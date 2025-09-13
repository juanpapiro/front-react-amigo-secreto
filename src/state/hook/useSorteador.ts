import { useListaParticipantes } from "./useListaParticipantes"
import { useSetRecoilState } from "recoil";
import { resultadoAmigoSecrego } from "../atom";
import { realizarSorteio } from "../helpers/realizarSorteio";

export const useSorteador = () => {

    const participantes = useListaParticipantes();

    const setResultado = useSetRecoilState(resultadoAmigoSecrego);

    return () => {
        setResultado(realizarSorteio(participantes));
    }

}