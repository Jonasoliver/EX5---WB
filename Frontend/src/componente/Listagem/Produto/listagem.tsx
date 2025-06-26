import { useState, useEffect } from "react";
import Seletor from "../../Seletor/seletor";
import { IReadProduto } from "../../../Interfaces/produto";
import { listarClientesMaisConsumiramQuantidade, listarClientesMaisConsumiramValor, listarMaisConsumidosGenero, listarProdutos, listarProdutosMaisConsumidos } from "../../../services/Produto/produto";
import { Card } from "react-bootstrap";

function ListagemProduto() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string>("");
  const [opcaoGenero, setOpcaoGenero] = useState<string>("");
  const [produtos, setProdutos] = useState<IReadProduto[]>([])


  useEffect(() => {
    if (opcaoSelecionada === "1") {
      fetchProdutos();
    } else if (opcaoSelecionada === "2" && opcaoGenero) {
      fetchMaisConsumidosGenero(opcaoGenero);
    } else if (opcaoSelecionada === "3") {
      fetchMaisConsumidos();
    } else if (opcaoSelecionada === "4") {
      fetchClientesMaisConsumiramValor();
    } else if (opcaoSelecionada === "5") {
      fetchClientesMaisConsumiramQuantidade();
    }
  }, [opcaoSelecionada, opcaoGenero]);

  function handleOptionChange(opcaoSelecionada: string) {
    setOpcaoSelecionada(opcaoSelecionada);
  }

  function handleGenderChange(opcaoGenero: string) {
    setOpcaoGenero(opcaoGenero);
  }

  // Funções de listagem
  async function fetchProdutos(){
    try{
      const resultado = await listarProdutos()
      if(resultado){
        setProdutos(resultado.data)
      }
    }catch(error){
      console.error(`Erro ao listar produtos: ${error}`)
    }
  }

  async function fetchMaisConsumidosGenero(opcaoGenero: string){
    try{
      const resultado = await listarMaisConsumidosGenero(opcaoGenero)
      if(resultado){
        setProdutos(resultado.data)
      }

    }catch(error){
      console.error(`Erro ao listar produtos: ${error}`)
    }
  }

  async function fetchMaisConsumidos(){
    try{
      const resultado = await listarProdutosMaisConsumidos()
      if(resultado){
        setProdutos(resultado.data)
      }

    }catch(error){
      console.error(`Erro ao listar produtos: ${error}`)
    }
  }

  async function fetchClientesMaisConsumiramValor(){
    try{
      const resultado = await listarClientesMaisConsumiramValor()
      if(resultado){
        setProdutos(resultado.data)
      }
    }catch(error){
      console.error(`Erro ao listar produtos: ${error}`)
    }
  }

  async function fetchClientesMaisConsumiramQuantidade(){
    try{
      const resultado = await listarClientesMaisConsumiramQuantidade()
      if(resultado){
        setProdutos(resultado.data)
      }
    }catch(error){
      console.error(`Erro ao listar produtos: ${error}`)
    }
  }

  // Opções de listagem do seletor
  const opcoes = [
    { value: "1", label: "Listagem de todos os produtos" },
    { value: "2", label: "Listar produtos mais consumidos por gênero" },
    { value: "3", label: "Listagem dos produtos mais consumidos" },
    {
      value: "4",
      label: "Listagem dos 5 clientes que mais consumiram produtos (em valor)",
    },
    {
      value: "5",
      label:
        "Listagem dos 10 Clientes que mais consumiram produtos(quantidade)",
    },
  ]

  // Variavel do return html 
  let content

  switch (opcaoSelecionada) {
    case "1":
      content = (
        <>
          {produtos && produtos.length > 0 ? (
            produtos.map((produto, index) => (
              <Card className="card" key={index} >
                <Card.Header
                  style={{ backgroundColor: "lightcoral", color: "white", textAlign: 'center'  }}
                >
                 Produto Id: {produto.produtoId} 
                </Card.Header>
                <Card.Body>
                <Card.Text>Produto: {produto.nome} </Card.Text>
                  <Card.Text>Estoque: {produto.estoque} </Card.Text>
                  <Card.Text>Valor Unidade: R${produto.valor}</Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div>Não possui produtos cadastrados!</div>
          )}
        </>
      )
      break
    
    case "2":
      // opções para o seletor de gênero
      const genderOptions = [
        { value: "Masculino", label: "Masculino" },
        { value: "Feminino", label: "Feminino" },
        { value: "Outros", label: "Outros" },
      ];
    
      content = (
        <div>
          <Seletor opcoes={genderOptions} onChange={handleGenderChange} />
          {opcaoGenero && (
            <div>
              <>
            {produtos && produtos.length > 0 ? (
              produtos.map((produto, index) => (
                <Card className="card" key={index}>
                  <Card.Header
                    style={{ backgroundColor: "lightcoral", color: "white" , textAlign: 'center'}}
                  >
                    Produto Id: {produto.produtoId} 
                  </Card.Header>
                  <Card.Body>
                  <Card.Text>Produto: {produto.nome} </Card.Text>
                    <Card.Text>Valor Unidade: R${produto.valor}</Card.Text>
                    <Card.Text>Total Vendido: {produto.totalconsumido} </Card.Text>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div>Nenhum produto consumido!</div>
            )}
        </>
            </div>
          )}
        </div>
      )
      break

    case "3":
      content = (
        <>
        {produtos && produtos.length > 0 ? (
              produtos.map((produto, index) => (
                <Card className="card" key={index}>
                  <Card.Header
                    style={{ backgroundColor: "lightcoral", color: "white" , textAlign: 'center'}}
                  >
                    Produto Id: {produto.produtoId} 
                  </Card.Header>
                  <Card.Body>
                  <Card.Text>Produto: {produto.nome} </Card.Text>
                    <Card.Text>Valor Unidade: R${produto.valor}</Card.Text>
                    <Card.Text>Total Vendido: {produto.totalconsumido} </Card.Text>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div>Nenhum produto consumido!</div>
            )}
        </>
      )
      break

    case "4":
      content = (
        <>
        {produtos && produtos.length > 0 ? (
              produtos.map((produto, index) => (
                <Card className="card" key={index}>
                 <Card.Header
                    style={{ backgroundColor: "lightcoral", color: "white" , textAlign: 'center'}}
                  >
                    Cliente Id: {produto.cliId}
                  </Card.Header>
                  <Card.Body>
                  <Card.Text>Nome cliente: {produto.nomecliente} </Card.Text>
                    <Card.Text>Produto: {produto.nome}</Card.Text>
                    <Card.Text>Total Gasto: R$ {produto.valortotal?.toFixed(2)} </Card.Text>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div>Nenhum produtos consumido!</div>
            )}
        </>
      )
      break

    case "5":
      content = (
        <>
        {produtos && produtos.length > 0 ? (
              produtos.map((produto, index) => (
                <Card className="card" key={index} >
                  <Card.Header
                    style={{ backgroundColor: "lightcoral", color: "white" , textAlign: 'center'}}
                  >
                    Cliente Id: {produto.cliId}
                  </Card.Header>
                  <Card.Body>
                  <Card.Text>Nome cliente: {produto.nomecliente} </Card.Text>
                    <Card.Text>Produto: {produto.nome}</Card.Text>
                    <Card.Text>Total Vendido: {produto.totalconsumido} </Card.Text>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div>Nenhum produtos consumido!</div>
            )}
        </>
      )
      break

    default:
      content = null
      break
  }

  return (
    <>
      <Seletor opcoes={opcoes} onChange={handleOptionChange} />
      {content}
    </>
  );
}
export default ListagemProduto;
