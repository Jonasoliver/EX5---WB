import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Seletor from "../Seletor/seletor";
import './style.css'
import { ICreateVenda } from "../../Interfaces/venda";
import { registraVenda } from "../../services/Venda/venda";

function FormularioVenda() {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [formDataVenda, setFormDataVenda] = useState<ICreateVenda>({
        quantidade: 0,
        cliId: 0,
        id: 0,
        funcionarioId: 0
    })

    // Função para registrar uma venda 
    async function handleRegistraVenda(){
        try{
            let resultado
            switch(selectedOption){
                case '1':
                    resultado = await registraVenda({
                        quantidade: formDataVenda.quantidade,
                        cliId: formDataVenda.cliId,
                        id: formDataVenda.id,
                        tipo: 'produto',
                        funcionarioId: formDataVenda.funcionarioId
                    })
                    break
                case '2':
                    resultado = await registraVenda({
                        quantidade: formDataVenda.quantidade,
                        cliId: formDataVenda.cliId,
                        id: formDataVenda.id,
                        tipo: 'servico',
                        funcionarioId: formDataVenda.funcionarioId
                    })
                    break
            }
            if(resultado){
                alert(resultado.message)
            }
        }catch(error){
            console.error(error)
        }
    }
    
    function handleOptionChange (selectedOption: string){
        setSelectedOption(selectedOption);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        const { name, value }  = event.target
        setFormDataVenda((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const options = [
        { value: '1', label: 'Produto' },
        { value: '2', label: 'Serviço' }
    ];

    const valor = selectedOption === '1' ? 'Produto' : 'Serviço';

    

    // Renderizar o formulário apenas se uma opção estiver selecionada
    return (
        <div className="formVenda">
            <Seletor opcoes={options} onChange={handleOptionChange} />
            {selectedOption && (
                <form className="" onSubmit={handleRegistraVenda}>
                    <div className="formVenda">
                        <div className="input-field">
                            <input 
                            required
                            id="cliId" 
                            type="number" 
                            className="validate" 
                            name="cliId" 
                            onChange={handleInputChange}
                            />
                            <label htmlFor="cliId">Id do Cliente</label>
                        </div>
                        <div className="input-field">
                            <input 
                            required
                            id="funcionarioId" 
                            type="number" 
                            className="validate" 
                            name="funcionarioId" 
                            onChange={handleInputChange}
                            />
                            <label htmlFor="funcionarioId">Id do Funcionario</label>
                        </div>
                        <div className="input-field">
                            <input 
                            required
                            id="id" 
                            type="number" 
                            className="validate" 
                            name="id" 
                            onChange={handleInputChange}
                            />
                            <label htmlFor="id">Id do {valor}</label>
                        </div>
                        <div className="input-field">
                            <input 
                            required
                            id="quantidade" 
                            type="number" 
                            className="validate"
                             name="quantidade" 
                             onChange={handleInputChange}
                             />
                            <label htmlFor="quantidade">Quantidade Consumida</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <Button type="submit" variant="danger" name="action">Registrar</Button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default FormularioVenda;
