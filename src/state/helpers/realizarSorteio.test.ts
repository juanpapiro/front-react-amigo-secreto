import { realizarSorteio } from "./realizarSorteio";

describe('dado um sorteio de amigo secreto', () => {

    test('deve validar que não sorteie o próprio nome', () => {
        const participantes = ['Ana', 'Catarina', 'Jorel', 'Irmão do Jorel', 'Irmão do irmão do Jorel'];

        const sorteados = realizarSorteio(participantes);

        participantes.forEach(participante => {
            const amigoSecreto = sorteados.get(participante);
            expect(participante).not.toEqual(amigoSecreto);
        });
    })

})