import { act, fireEvent, render, screen } from "@testing-library/react"
import { Formulario } from ".";
import { RecoilRoot } from "recoil";

describe(`Comportamento do component ${Formulario.name}.tsx`, () => {

    test('Quando o input está vazio, novos participantes não podem ser adicionados', () => {

        //renderiza o componente a ser testado
        render(<RecoilRoot><Formulario /></RecoilRoot>)

        //localiza no DOM o input pelo placeholder
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes.');
        
        //localiza no Dom o botao de submit no form
        const botao = screen.getByRole('button');

        //valida se o input foi localizado
        expect(input).toBeInTheDocument();

        //valida se o botão está desabilitado
        expect(botao).toBeDisabled();
    })


    test('adicionar um participante caso exista um nome preenchido', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        )

        //localiza no DOM o input pelo placeholder
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes.');
        
        //localiza no Dom o botao de submit no form
        const botao = screen.getByRole('button');

        // inserir um valor no input
        fireEvent.change(input, {target: {value: 'Ana Catarina'}})

        // clicar no botão de submeter
        fireEvent.click(botao)

        // garantir que o input esteja com foco ativo
        expect(input).toHaveFocus();

        // garantir que o input não tenha valor
        expect(input).toHaveValue("");
    });

    test('nomes duplicados não podem ser adicionados na lista', () => {
        render(<RecoilRoot><Formulario /></RecoilRoot>)
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes.');
        const botao = screen.getByRole('button');
        fireEvent.change(input, {target: {value: 'Ana Catarina'}});
        fireEvent.click(botao);
        fireEvent.change(input, {target: {value: 'Ana Catarina'}});
        fireEvent.click(botao);

        const mensagemErro = screen.getByRole('alert')

        expect(mensagemErro.textContent).toBe('nomes duplicados não são permitidos!');
    });

    test('mensagem de erro deve sumir após timers', () => {
        jest.useFakeTimers()
        render(<RecoilRoot><Formulario /></RecoilRoot>)
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes.');
        const botao = screen.getByRole('button');
        fireEvent.change(input, {target: {value: 'Ana Catarina'}});
        fireEvent.click(botao);
        fireEvent.change(input, {target: {value: 'Ana Catarina'}});
        fireEvent.click(botao);

        let mensagemErro = screen.queryByRole('alert')

        expect(mensagemErro).toBeInTheDocument();
        
        act(() => {jest.runAllTimers()});

        mensagemErro = screen.queryByRole('alert');
    });
    
})