import { useRecoilValue } from "recoil"
import { resultadoAmigoSecrego } from "../atom"

export const useResultadoDoSorteio = () => {
    return useRecoilValue(resultadoAmigoSecrego);
}