import { Button } from "react-bootstrap";
import "./style.css";
import { useState } from "react";
import { ICreateCliente } from "../../Interfaces/cliente";
import { criarCliente } from "../../services/Cliente/cliente";
import Seletor from "../Seletor/seletor";
import { ICreateProduto } from "../../Interfaces/produto";
import { criarProduto } from "../../services/Produto/produto";
import { ICreateServico } from "../../Interfaces/servico";
import { criarServico } from "../../services/Servico/servico";

interface FormCadastroProps {
  tipo: string;
}

function FormularioCadastro({ tipo }: FormCadastroProps) {
  const [formData, setFormData] = useState<ICreateCliente>({
    nome: "",
    nomeSocial: "",
    genero: "",
    cpf: {
      valor: "",
      dataEmissao: "",
    },
    rgs: [
      {
        valor: "",
        dataEmissao: "",
      },
    ],
    telefones: [
      {
        ddd: "",
        numero: "",
      },
    ],
  })
  const [formDataProduto, setFormDataProduto] = useState<ICreateProduto>({
    nome: '',
    valor: 0,
    estoque: 0
  })
  const [formDataServico, setFormDataServico] = useState<ICreateServico>({
    nome:'',
    valor:0
  })

 // Função que contém função de cadastro de acordo com o tipo
 async function handleSaveChanges(event: React.FormEvent) {
  event.preventDefault();
  try {
    let formDataToValidate;
    switch(tipo){
      case 'cliente':
        formDataToValidate = formData;
        break;
      case 'produto':
        formDataToValidate = formDataProduto;
        break;
      case 'servico':
        formDataToValidate = formDataServico;
        break;
      default:
        return;
    }

    const verificaCampoVazio = Object.values(formDataToValidate).some(value => 
      typeof value === 'string' && (value.trim() === "" || value.trim().length === 0)
    );

    if (verificaCampoVazio ) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    if (tipo === 'cliente' && !formData.genero) {
      alert("Por favor, selecione o gênero.");
      return;
    }

    let resultadoCadastro;
    switch(tipo){
      case 'cliente':
        resultadoCadastro = await criarCliente(formData);
        break
      case 'produto':
        resultadoCadastro = await criarProduto(formDataProduto)
        break
      case 'servico':
        resultadoCadastro = await criarServico(formDataServico)
        break
    }
    if (resultadoCadastro.success) {
      alert(resultadoCadastro.message);
    }
  } catch (error) {
    console.error(error);
  }
}

  // Funções para mudar o valor
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    switch(tipo){
      case  'cliente':
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break
      case 'produto':
        setFormDataProduto((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break
      case 'servico':
        setFormDataServico((prevState) => ({
          ...prevState,
          [name]: value,
        }))
        break
      }
    
  }

  function handleCpfChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      cpf: {
        ...prevState.cpf,
        [name]: value,
      },
    }));
  }

  function handleRgChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      rgs: [
        {
          ...prevState.rgs[0],
          [name]: value,
        },
      ],
    }));
  }

  function handleTelChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      telefones: [
        {
          ...prevState.telefones[0],
          [name]: value,
        },
      ],
    }));
  }

  function handleGeneroChange(generoSelecionado: string) {
    setFormData((prevState) => ({
        ...prevState,
        genero: generoSelecionado
    }));
}

 // Opções de gênero
  const opcoesGenero = [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Feminino', label: 'Feminino' },
    { value: 'Outros', label: 'Outros' }
]
  // variavel que varia de acordo com o que deseja o tipo 
  let content

  switch (tipo) {
    case "cliente":
      content = (
        <>
          <div className="column">
            <div className="input-field col s6">
              <input
              required
                id="nome"
                type="text"
                className="validate"
                name="nome"
                onChange={handleInputChange}
              />
              <label htmlFor="nome">Nome</label>
            </div>
            <div className="input-field col s6">
              <input
                id="nomeSocial"
                type="text"
                className="validate"
                name="nomeSocial"
                onChange={handleInputChange}
              />
              <label htmlFor="nomeSocial">Nome Social </label>
            </div>
            <div className="">
            <label htmlFor="genero" >Gênero</label>
              <Seletor opcoes={opcoesGenero} onChange={handleGeneroChange} />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
              required
                id="cpf"
                type="text"
                className="validate"
                name="valor"
                onChange={handleCpfChange}
              />
              <label htmlFor="cpf">CPF Valor</label>
            </div>
            <div className="input-field col s6">
              <input
              required
                id="cpf_dataEmissao"
                type="date"
                className="validate"
                name="dataEmissao"
                onChange={handleCpfChange}
              />
              <label htmlFor="cpf_dataEmissao">CPF Data de Emissão</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
              required
                id="rg_valor"
                type="text"
                className="validate"
                name="valor"
                onChange={handleRgChange}
              />
              <label htmlFor="rg_valor">RG Valor</label>
            </div>
            <div className="input-field col s6">
              <input
              required
                id="rg_dataEmissao"
                type="date"
                className="validate"
                name="dataEmissao"
                onChange={handleRgChange}
              />
              <label htmlFor="rg_dataEmissao">RG Data de Emissão</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
              required
                id="telefone_ddd"
                type="text"
                className="validate"
                name="ddd"
                onChange={handleTelChange}
              />
              <label htmlFor="telefone_ddd">Telefone DDD</label>
            </div>
            <div className="input-field col s6">
              <input
              required
                id="telefone_numero"
                type="text"
                className="validate"
                name="numero"
                onChange={handleTelChange}
              />
              <label htmlFor="telefone_numero">Telefone Número</label>
            </div>
          </div>
        </>
      )
      break;

    case "produto":
      content = (
        <div className="column">
          <div className="input-field col s6">
            <input 
              required
              id="nome" 
              type="text" 
              className="validate" 
              name="nome"
              onChange={handleInputChange} />
            <label htmlFor="nome">Nome do Produto</label>
          </div>
          <div className="input-field col s6">
            <input
            required
              id="valor_prod"
              type="number"
              step="0.01" 
              className="validate"
              name="valor"
              onChange={handleInputChange}
            />
            <label htmlFor="valor_prod">Valor do Produto</label>
          </div>
          <div className="input-field col s6">
            <input
            required
              id="estoque"
              type="number"
              className="validate"
              name="estoque"
              onChange={handleInputChange}
            />
            <label htmlFor="estoque">Estoque</label>
          </div>
        </div>
      )
      break

    case "servico":
      content = (
        <>
          <div className="row">
            <div className="input-field col s6">
              <input 
              required
              id="nome" 
              type="text" 
              className="validate" 
              name="nome" 
              onChange={handleInputChange}
              />
              <label htmlFor="nome">Nome do Serviço</label>
            </div>
            <div className="input-field col s6">
              <input
              required
                id="valor_serv"
                type="number"
                className="validate"
                name="valor" 
                step="0.01" 
                onChange={handleInputChange}
              />
              <label htmlFor="valor">Valor do Serviço</label>
            </div>
          </div>
        </>
      );
      break

    default:
      content = null
      break
  }

  return (
    <form className="col s12" onSubmit={handleSaveChanges}>
      {content}
      <div className="row">
        <div className="col s12">
          <Button type="submit" variant="danger">
            Cadastrar
          </Button>
        </div>
      </div>
    </form>
  )
  
}

export default FormularioCadastro;
