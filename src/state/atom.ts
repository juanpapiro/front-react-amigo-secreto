import { atom } from "recoil";

export const listaParticipantesState = atom<string[]>({
    key: 'listaParticipantesState',
    default: []
})

export const errorState = atom<string>({
    key: 'errorState',
    default: ''
})

export const resultadoAmigoSecrego = atom<Map<string,string>>({
    key: 'resultadoAmigoSecrego',
    default: new Map()
})