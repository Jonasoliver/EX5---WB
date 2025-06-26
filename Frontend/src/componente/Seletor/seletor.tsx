import 'materialize-css/dist/css/materialize.min.css';
import { useEffect } from 'react';
import M from 'materialize-css';

interface SeletorProps {
    opcoes: { value: string, label: string }[];
    onChange: (opcaoSelecionada: string) => void;
}

function Seletor({ opcoes, onChange }: SeletorProps) {
    useEffect(() => {
        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }, []);

    return (
        <select onChange={(e) => onChange(e.target.value)} >
            <option value="0">Selecione uma opção</option>
            {opcoes.map((opcao, index) => (
                <option key={index} value={opcao.value} >{opcao.label}</option>
            ))}
        </select>
    );
}

export default Seletor;



