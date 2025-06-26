import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import EditarModal from "../Modal/editar";
import ModalExcluir from "../Modal/excluir";
import "./style.css";
import { IVerCliente } from "../../Interfaces/cliente";
import { IReadProduto } from "../../Interfaces/produto";
import { IReadServico } from "../../Interfaces/servico";

interface ViewProps {
  tipo: "cliente" | "produto" | "servico";
  cliente?: IVerCliente;
  produto?: IReadProduto;
  servico?: IReadServico;
}

function View({ tipo, cliente, produto, servico }: ViewProps) {
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [modalAbertoExclusao, setModalAbertoExclusao] = useState<boolean>(false);

  function abrirModal() {
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function abrirModalExclusao() {
    setModalAbertoExclusao(true);
  }

  function fecharModalExclusao() {
    setModalAbertoExclusao(false);
  }

  let content;

  switch (tipo) {
    case "cliente":
      content = cliente ? (
        <div>
          <Card className="card">
            <Card.Header style={{ backgroundColor: "lightcoral", color: "white" }}>
              {cliente.nome}
            </Card.Header>
            <Card.Body>
              {cliente.nomeSocial && (
                <Card.Text>Nome Social: {cliente.nomeSocial}</Card.Text>
              )}
              <Card.Text>CPF: {cliente.cpf.valor}</Card.Text>
              <Card.Text>Gênero: {cliente.genero}</Card.Text>
              {cliente.rgs.map((rg, index) => (
                <Card.Text key={index}>RG: {rg.valor}</Card.Text>
              ))}
              {cliente.telefones.map((telefone, index) => (
                <Card.Text key={index}>
                  Telefone: +{telefone.ddd} {telefone.numero}
                </Card.Text>
              ))}
              <Button
                variant="success"
                onClick={abrirModal}
                style={{ margin: "0.5rem", boxShadow: "none", border: "none" }}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                onClick={abrirModalExclusao}
                style={{ margin: "0.5rem", boxShadow: "none", border: "none" }}
              >
                Deletar
              </Button>
            </Card.Body>
          </Card>
          {modalAberto && (
            <EditarModal
              show={modalAberto}
              onHide={fecharModal}
              tipo="cliente"
              id={cliente.cliId?.toString() || ''}
            />
          )}
          {modalAbertoExclusao && (
            <ModalExcluir
              show={modalAbertoExclusao}
              onHide={fecharModalExclusao}
              id={cliente.cliId?.toString() || ''}
              tipo="cliente"
            />
          )}
        </div>
      ) : (
        content = null
      );
      break;

    case "produto":
      content = produto ? (
        <div>
          <Card className="card">
            <Card.Header style={{ backgroundColor: "lightcoral", color: "white" }}>
              {produto.produtoId} - Produto: {produto.nome}
            </Card.Header>
            <Card.Body>
              <Card.Text>Valor Unidade: {produto.valor}</Card.Text>
              <Card.Text>Estoque disponível: {produto.estoque}</Card.Text>
              <Button
                variant="success"
                onClick={abrirModal}
                style={{ margin: "0.5rem", boxShadow: "none", border: "none" }}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                onClick={abrirModalExclusao}
                style={{ margin: "0.5rem", boxShadow: "none", border: "none" }}
              >
                Deletar
              </Button>
            </Card.Body>
          </Card>
          {modalAberto && (
            <EditarModal
              show={modalAberto}
              onHide={fecharModal}
              tipo="produto"
              id={produto.produtoId?.toString() || ''}
            />
          )}
          {modalAbertoExclusao && (
            <ModalExcluir
              show={modalAbertoExclusao}
              onHide={fecharModalExclusao}
              id={produto.produtoId?.toString() || ''}
              tipo="produto"
            />
          )}
        </div>
      ) : (
        content = null
      );
      break;

    case "servico":
      content = servico ? (
        <div>
          <Card className="card">
            <Card.Header style={{ backgroundColor: "lightcoral", color: "white" }}>
              Id: {servico.servicoId} Nome: {servico.nome}
            </Card.Header>
            <Card.Body>
              <Card.Text>Prestado: {servico.vendasServico} vezes</Card.Text>
              <Card.Text>Valor: R$ {servico.valor}</Card.Text>
              <Button
                variant="success"
                onClick={abrirModal}
                style={{ margin: "0.5rem", boxShadow: "none", border: "none" }}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                onClick={abrirModalExclusao}
                style={{ margin: "0.5rem", boxShadow: "none", border: "none" }}
              >
                Deletar
              </Button>
            </Card.Body>
          </Card>
          {modalAberto && (
            <EditarModal
              show={modalAberto}
              onHide={fecharModal}
              tipo="servico"
              id={servico.servicoId?.toString() || ''}
            />
          )}
          {modalAbertoExclusao && (
            <ModalExcluir
              show={modalAbertoExclusao}
              onHide={fecharModalExclusao}
              id={servico.servicoId?.toString() || ''}
              tipo="servico"
            />
          )}
        </div>
      ) : (
        content = null
      );
      break;

    default:
      content = <div>Valor não encontrado!</div>;
      break;
  }
  return content;
}

export default View;