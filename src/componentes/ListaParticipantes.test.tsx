import React from "react";
import { render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { ListaParticipantes } from "./ListaParticipantes"
import { useListaParticipantes } from "../state/hook/useListaParticipantes";

jest.mock('../state/hook/useListaParticipantes', () => {
    return {useListaParticipantes: jest.fn()}
})

describe('Lista vazia de participantes', () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([]);
    })
    test('deve renderizar sem elementos', () => {
        render(
            <RecoilRoot>
                <ListaParticipantes />
            </RecoilRoot>
        );

        const lista = screen.queryAllByRole('listitem');

        expect(lista).toHaveLength(0);
    });
});

describe('Lista preenchida', () => {

    const participantes = ['Ana', 'Catatina'];
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
    });
    test('uma lista preenchida de participantes', () => {

        render(
            <RecoilRoot>
                <ListaParticipantes />
            </RecoilRoot>
        );

        const lista = screen.queryAllByRole('listitem');

        expect(lista).toHaveLength(participantes.length);
    })

})