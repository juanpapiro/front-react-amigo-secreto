import shuffle from "just-shuffle";

export const realizarSorteio = (participantes: string[]): Map<string,string> => {
    const totalParticipantes = participantes.length;
    const embaralhando = shuffle(participantes);
    const amigosSecretosSorteados = new Map<string, string>();

    for (let index = 0; index < totalParticipantes; index++) {
        let indexAmigo = (index === (totalParticipantes - 1)) ? 0 : index + 1;
        amigosSecretosSorteados.set(embaralhando[index], embaralhando[indexAmigo]);
    }
    return amigosSecretosSorteados;
}