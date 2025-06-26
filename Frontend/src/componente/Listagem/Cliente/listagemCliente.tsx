import { useEffect, useState } from "react";
import Seletor from "../../Seletor/seletor";
import { listarClientes, listarClientesGenero } from "../../../services/Cliente/cliente";
import { Card } from "react-bootstrap";
import { IReadCliente } from "../../../Interfaces/cliente";

function ListagemCliente() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
  const [opcaoGenero, setOpcaoGenero] = useState("");
  const [clientes, setClientes] = useState<IReadCliente[]>([]);

  function handleOptionChange(opcaoSelecionada: string) {
    setOpcaoSelecionada(opcaoSelecionada);
    setOpcaoGenero("");
    setClientes([]);
  }

  function handleGenderChange(opcaoSelecionada: string) {
    setOpcaoGenero(opcaoSelecionada);
    setClientes([]);
  }

  async function fetchClientes() {
    try {
      const resultadoListagem = await listarClientes();
      if (resultadoListagem.success) {
        setClientes(resultadoListagem.data)
      }
    } catch (error) {
      console.error("Erro ao carregar clientes.", error);
    }
  }

  async function fetchClientesGenero(opcaoGenero: string) {
    try {
      const resultadoListagem = await listarClientesGenero(opcaoGenero);
      if (resultadoListagem.success) {
        setClientes(resultadoListagem.data)
      }
    } catch (error) {
      console.error("Erro ao carregar clientes por gênero.", error);
    }
  }

  useEffect(() => {
    if (opcaoSelecionada === "1") {
      fetchClientes();
    } else if (opcaoSelecionada === "2" && opcaoGenero) {
      fetchClientesGenero(opcaoGenero);
    }
  }, [opcaoSelecionada, opcaoGenero]);

  const options = [
    { value: "1", label: "Listar todos os clientes" },
    { value: "2", label: "Listar por Gênero" },
  ];

  const genderOptions = [
    { value: "Masculino", label: "Masculino" },
    { value: "Feminino", label: "Feminino" },
    { value: "Outros", label: "Outros" },
  ];

  return (
    <div>
      <Seletor opcoes={options} onChange={handleOptionChange} />
      {opcaoSelecionada === "2" && (
        <Seletor opcoes={genderOptions} onChange={ handleGenderChange} />
      )}
      {clientes.length > 0 ? (
        <div>
          {clientes.map((cliente) => (
            <Card
              key={cliente.cliId}
              className="card"
              
            >
              <Card.Header
                style={{ backgroundColor: "lightcoral", color: "white" }}
              >
                Cliente Id: {cliente.cliId}
              </Card.Header>
              <Card.Body>
                <Card.Text>Nome do cliente: {cliente.nome}</Card.Text>
                <Card.Text>Gênero: {cliente.genero}</Card.Text>
                {cliente.nomeSocial && (
                  <Card.Text>Nome Social: {cliente.nomeSocial}</Card.Text>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        opcaoSelecionada && <p>Nenhum cliente encontrado.</p>
      )}
    </div>
  );
}

export default ListagemCliente;
