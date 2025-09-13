import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { Sorteio } from "."
import { useListaParticipantes } from "../../state/hook/useListaParticipantes"
import { useResultadoDoSorteio } from "../../state/hook/useResultadoDoSorteio"


jest.mock('../../state/hook/useListaParticipantes', () => {
    return { useListaParticipantes: jest.fn() }
})

jest.mock('../../state/hook/useResultadoDoSorteio', () => {
    return { useResultadoDoSorteio: jest.fn() }
})


describe('Na pagina de sorteio', () => {
    const participantes = ['Ana', 'Catarina', 'Jorel'];
    const resultado = new Map([['Ana','Catarina'],['Catarina', 'Jorel'],['Jorel', 'Ana']]);

    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
        (useResultadoDoSorteio as jest.Mock).mockReturnValue(resultado);
    })

    test('todos os particioantes podem exibir o seu amigo secreto', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        );

        const opcoes = screen.queryAllByRole('option');

        expect(opcoes).toHaveLength(participantes.length + 1)
    });

    test('o amigo secreto é exibido quando renderizado', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        );
        const select = screen.getByPlaceholderText('Selecione o seu nome');

        fireEvent.change(select, {target: {value: participantes[0]}});

        const btn = screen.getByRole('button');

        fireEvent.click(btn);

        const amigoSecreto = screen.getByRole('alert');

        expect(amigoSecreto).toBeInTheDocument()

    })
})