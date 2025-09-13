import { useRecoilValue } from "recoil"
import { errorState } from "../atom";

export const useMensagemErro = () => {
    const mensagem = useRecoilValue(errorState);
    return mensagem;
}