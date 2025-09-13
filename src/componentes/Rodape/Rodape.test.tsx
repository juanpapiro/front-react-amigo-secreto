import { RecoilRoot } from "recoil"
import  Rodape from "."
import { fireEvent, render, screen } from "@testing-library/react"
import { useListaParticipantes } from "../../state/hook/useListaParticipantes"

jest.mock('../../state/hook/useListaParticipantes', () => {
    return { useListaParticipantes: jest.fn() }
})

const mockNavigate = jest.fn();
const mockSorteador = jest.fn();

jest.mock('react-router-dom', () => {
    return { useNavigate: () => mockNavigate }
});

jest.mock('../../state/hook/useSorteador', () => {
    return { useSorteador: () => mockSorteador }
});

describe('não existem participantes', () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([])
    })
    test('a brincadeira não pode iniciar com participantes insuficientes', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        );

        const btn = screen.queryByRole('button')

        expect(btn).toBeDisabled();
    })

})

describe('existem participantes', () => {
    
    const names = ['Ana', 'Carlos', 'Maria'];
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(names)
    })
    
    test('a brincadeira pode iniciar quando existem participantes suficientes', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        );

        const btn = screen.queryByRole('button')

        expect(btn).not.toBeDisabled();
    })

    test('a brincadeira foi iniciada', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        );

        const btn = screen.getByRole('button');
        fireEvent.click(btn)

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/sorteio');
        expect(mockSorteador).toHaveBeenCalledTimes(1);

    })
})