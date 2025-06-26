import React, { useEffect, useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { IUpdateCliente } from "../../Interfaces/cliente";
import { atualizarCliente, verCliente } from "../../services/Cliente/cliente";
import Seletor from "../Seletor/seletor";
import { IUpdateProduto } from "../../Interfaces/produto";
import { atualizarProduto, verProduto } from "../../services/Produto/produto";
import { ICreateServico } from "../../Interfaces/servico";
import { atualizarServico, verServico } from "../../services/Servico/servico";

interface EditarModalProps {
  tipo: "cliente" | "produto" | "servico";
  onHide: () => void;
  id: string;
  show: boolean;
}

function EditarModal({ tipo, id, onHide, show }: EditarModalProps) {
  const [formDataCliente, setFormDataCliente] = useState<IUpdateCliente|null>(null);
  const [formDataProduto, setFormDataProduto] = useState<IUpdateProduto>({
    nome: '',
    valor: 0,
    estoque: 0
  })
  const [formDataServico, setFormDataServico] = useState<ICreateServico>({
    nome:'',
    valor:0
  })

  useEffect(() => {
    async function fetchData() {
      try {
        let resultado;
        switch (tipo) {
          case "cliente":
            resultado = await verCliente(id)
            setFormDataCliente(resultado.data);
            break;
          case "produto":
            resultado = await verProduto(id)
            setFormDataProduto(resultado.data)
            break;
          case "servico":
           resultado = await verServico(id)
           setFormDataServico(resultado.data)
            break;
        }
      } catch (error) {
        console.error(`Erro ao buscar informações: ${error}`);
      }
    }
    fetchData();
  }, [tipo, id]);

   // Funções para mudar o valor
   function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    switch(tipo){
      case  'cliente':
        setFormDataCliente((prevState) => ({
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
    setFormDataCliente((prevState) => ({
      ...prevState,
      cpf: {
        ...prevState!.cpf,
        [name]: value,
      },
    }));
  }

  function handleRgChange(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;
    const updatedRgs = formDataCliente?.rgs?.map((rg, i) =>
      i === index ? { ...rg, [name]: value } : rg
    );
    setFormDataCliente((prevState) => ({
      ...prevState,
      rgs: updatedRgs,
    }));
  }

  function handleTelChange(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;
    const updatedTelefones = formDataCliente?.telefones?.map((telefone, i) =>
      i === index ? { ...telefone, [name]: value } : telefone
    );
    setFormDataCliente((prevState) => ({
      ...prevState,
      telefones: updatedTelefones,
    }));
  }

  function handleGeneroChange(generoSelecionado: string) {
    setFormDataCliente((prevState) => ({
      ...prevState,
      genero: generoSelecionado,
    }));
  }

  async function handleSaveChanges() {
    try {
      let resultado;
      switch (tipo) {
        case "cliente":
          resultado = await atualizarCliente(id, formDataCliente!);
          break;
        case "produto":
          resultado = await atualizarProduto(id, formDataProduto)
          break;
        case "servico":
          resultado = await atualizarServico(id, formDataServico)
          break;
      }
      if (!resultado.success) {
        alert(resultado.message)
        onHide();
      }
      alert(resultado.message)
      onHide()
    } catch (error) {
      console.error(`Erro ao salvar informações: ${error}`);
    }
  }

  const opcoesGenero = [
    { value: "Masculino", label: "Masculino" },
    { value: "Feminino", label: "Feminino" },
    { value: "Outros", label: "Outros" },
  ];

  let content;
  switch (tipo) {
    case "cliente":
      content = (
        <>
          <div className="column">
            <div className="">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                className="validate"
                name="nome"
                value={formDataCliente?.nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="">
              <label htmlFor="nomeSocial">Nome Social (opcional)</label>
              <input
                id="nomeSocial"
                type="text"
                className="validate"
                name="nomeSocial"
                value={formDataCliente?.nomeSocial}
                onChange={handleInputChange}
              />
            </div>
            <div className="">
            <label htmlFor="genero">Gênero</label>
              <Seletor opcoes={opcoesGenero} onChange={handleGeneroChange} />
            </div>
            <div className="row">
              <div className="">
                <label htmlFor="cpf">CPF Valor</label>
                <input
                  id="cpf"
                  type="text"
                  className="validate"
                  name="valor"
                  value={formDataCliente?.cpf?.valor}
                  onChange={handleCpfChange}
                />
              </div>
              <div className="">
                <label htmlFor="cpf_dataEmissao">CPF Data de Emissão</label>
                <input
                  id="cpf_dataEmissao"
                  type="date"
                  className="validate"
                  name="dataEmissao"
                  value={formDataCliente?.cpf?.dataEmissao}
                  onChange={handleCpfChange}
                />
              </div>
            </div>

            {formDataCliente?.rgs?.map((rg, index) => (
              <div className="row" key={index}>
                <div className="">
                  <label htmlFor={`rg_valor_${index}`}>RG Valor</label>
                  <input
                    id={`rg_valor_${index}`}
                    type="text"
                    className="validate"
                    name="valor"
                    value={rg.valor}
                    onChange={(e) => handleRgChange(index, e)}
                  />
                </div>
                <div className="">
                  <label htmlFor={`rg_dataEmissao_${index}`}>
                    RG Data de Emissão
                  </label>
                  <input
                    id={`rg_dataEmissao_${index}`}
                    type="date"
                    className="validate"
                    name="dataEmissao"
                    value={rg.dataEmissao}
                    onChange={(e) => handleRgChange(index, e)}
                  />
                </div>
              </div>
            ))}

            {formDataCliente?.telefones?.map((telefone, index) => (
              <div className="row" key={index}>
                <div className="">
                  <label htmlFor={`telefone_ddd_${index}`}>Telefone DDD</label>
                  <input
                    id={`telefone_ddd_${index}`}
                    type="text"
                    className="validate"
                    name="ddd"
                    value={telefone.ddd}
                    onChange={(e) => handleTelChange(index, e)}
                  />
                </div>
                <div className="">
                  <label htmlFor={`telefone_numero_${index}`}>
                    Telefone Número
                  </label>
                  <input
                    id={`telefone_numero_${index}`}
                    type="text"
                    className="validate"
                    name="numero"
                    value={telefone.numero}
                    onChange={(e) => handleTelChange(index, e)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      );
      break;
    case "produto":
      content =(
        <div className="column">
        <div >
        <label htmlFor="nome">Nome do Produto</label>
          <input 
            required
            id="nome" 
            type="text" 
            className="validate" 
            name="nome"
            value={formDataProduto.nome}
            onChange={handleInputChange} />
        </div>
        <div >
        <label htmlFor="valor_prod">Valor do Produto</label>
          <input
          required
            id="valor_prod"
            type="number"
            step="0.01" 
            className="validate"
            name="valor"
            value={formDataProduto.valor}
            onChange={handleInputChange}
          />
         
        </div>
        <div >
        <label htmlFor="estoque">Estoque</label>
          <input
          required
            id="estoque"
            type="number"
            className="validate"
            name="estoque"
            value={formDataProduto.estoque}
            onChange={handleInputChange}
          />
          
        </div>
      </div>
      )
      break;
    case "servico":
      content = (
        <>
          <div className="column">
            <div >
            <label htmlFor="nome">Nome do Serviço</label>
              <input 
              id="nome" 
              type="text" 
              className="validate" 
              name="nome" 
              value={formDataServico.nome}
              onChange={handleInputChange}
              />
              
            </div>
            <div >
            <label htmlFor="valor">Valor do Serviço</label>
              <input
                id="valor_serv"
                type="number"
                className="validate"
                name="valor" 
                step="0.01" 
                value={formDataServico.valor}
                onChange={handleInputChange}
              />
              
            </div>
          </div>
        </>
      );
      break;
    default:
      content = null
      break;
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      style={{
        background: "none",
        border: "none",
        overflowX: "hidden",
        boxShadow: "none",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Informações</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer style={{ background: "none" }}>
        <Button
          variant="outline-dark"
          onClick={onHide}
          style={{ margin: "0.5rem", boxShadow: "none", border: "none" }}
        >
          Fechar
        </Button>
        <Button
          variant="danger"
          onClick={handleSaveChanges}
          style={{ margin: "0.5rem", boxShadow: "none", border: "none" }}
        >
          Salvar Alterações
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditarModal;
