import { useEffect, useState } from "react";
import Seletor from "../../Seletor/seletor";
import { IReadServico } from '../../../Interfaces/servico'
import { listarClientesMaisConsumiramQuantidadeServ, listarClientesMaisConsumiramValorServ, listarMaisConsumidosGeneroServ, listarServicos, listarServicosMaisConsumidos } from "../../../services/Servico/servico";
import { Card } from "react-bootstrap";

function ListagemServico() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string>("");
  const [opcaoGenero, setOpcaoGenero] = useState<string>("");
  const [servicos, setServicos] = useState<IReadServico[]>([])

  useEffect(()=>{
    if (opcaoSelecionada === "1") {
      fetchServicos()
    } else if (opcaoSelecionada === "2" && opcaoGenero) {
      fetchMaisConsumidosGenero(opcaoGenero)
    } else if (opcaoSelecionada === "3") {
      fetchMaisConsumidos()
    } else if (opcaoSelecionada === "4") {
      fetchClientesMaisConsumiramValor()
    } else if (opcaoSelecionada === "5") {
      fetchClientesMaisConsumiramQuantidade()
    }
  }, [opcaoSelecionada, opcaoGenero])

  // Funções de listagem
  async function fetchServicos() {
    try{
      const resultado = await listarServicos()
      if(resultado){
        setServicos(resultado.data)
        
      }
    }catch(error){
      console.error(`Erro ao listar serviços`)
    }
  }

  async function fetchMaisConsumidosGenero(opcaoGenero: string) {
    try{
      const resultado = await listarMaisConsumidosGeneroServ(opcaoGenero)
      if(resultado){
        setServicos(resultado.data)
        console.log(resultado.data)
      }
    }catch(error){
      console.error(`Erro ao listar serviços`)
    }
  }

  async function fetchMaisConsumidos() {
    try{
      const resultado = await listarServicosMaisConsumidos()
      if(resultado){
        setServicos(resultado.data)
      }
    }catch(error){
      console.error(`Erro ao listar serviços`)
    }
  }

  async function fetchClientesMaisConsumiramValor() {
    try{
      const resultado = await listarClientesMaisConsumiramValorServ()
      if(resultado){
        setServicos(resultado.data)
      }
    }catch(error){
      console.error(`Erro ao listar serviços`)
    }
  }

  async function fetchClientesMaisConsumiramQuantidade() {
    try{
      const resultado = await listarClientesMaisConsumiramQuantidadeServ()
      if(resultado){
        setServicos(resultado.data)
      }
    }catch(error){
      console.error(`Erro ao listar serviços`)
    }
  }

  //Muda state
  function handleOptionChange(opcaoSelecionada: string) {
    setServicos([])
    setOpcaoSelecionada(opcaoSelecionada);
    setOpcaoGenero('')
  
  }

  function handleGenderChange(opcaoGenero: string) {
    setOpcaoGenero(opcaoGenero);
    setServicos([])
  }

  // Opções seletor
 const opcoes = [
    { value: "1", label: "Listagem de todos os serviços" },
    { value: "2", label: "Listar serviços mais consumidos por gênero" },
    { value: "3", label: "Listagem dos serviços mais consumidos" },
    {
      value: "4",
      label: "Listagem dos 5 clientes que mais consumiram serviços (em valor)",
    },
    {
      value: "5",
      label:
        "Listagem dos 10 Clientes que mais consumiram serviços(quantidade)",
    },
  ]

  // varivel que muda o que vai aparecer no return
  let content

  switch (opcaoSelecionada) {

    case "1":
      content = (
        <>
          {servicos && servicos.length > 0 ? (
            servicos.map((servico, index) => (
              <Card className="card" key={index}>
                <Card.Header
                  style={{ backgroundColor: "lightcoral", color: "white", textAlign: 'center' }}
                >
                   Serviço Id : {servico.servicoId}
                </Card.Header>
                <Card.Body>
                <Card.Text>Serviços: {servico.nome} vezes </Card.Text>
                  <Card.Text>Prestado: {servico.vendasServico}x </Card.Text>
                  <Card.Text>Valor: R$ {servico.valor}</Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div>Não possui serviço cadastrado!</div>
          )}
        </>
      );
      break;

    case "2":
      const genderOptions = [
        { value: "Masculino", label: "Masculino" },
        { value: "Feminino", label: "Feminino" },
        { value: "Outros", label: "Outros" },
      ];
      content = (
        <div>
          <Seletor opcoes={genderOptions} onChange={handleGenderChange} />
          {opcaoGenero && (
             <>
             {servicos && servicos.length > 0 ? (
               servicos.map((servico, index) => (
                 <Card className="card" key={index}>
                   <Card.Header
                     style={{ backgroundColor: "lightcoral", color: "white", textAlign: 'center' }}
                   >
                     Serviço ID : {servico.servicoId}
                   </Card.Header>
                   <Card.Body>
                   <Card.Text>Serviço: {servico.nome}</Card.Text>
                     <Card.Text>Total Consumido: {servico.totalconsumido}x  </Card.Text>
                     <Card.Text>Valor: R$ {servico.valor}</Card.Text>
                   </Card.Body>
                 </Card>
               ))
             ) : (
               <div>Não possui serviços consumidos!</div>
             )}
           </>
          )}
        </div>
      );
      break

    case "3":
      content = (
        <>
             {servicos && servicos.length > 0 ? (
               servicos.map((servico, index) => (
                 <Card className="card" key={index}>
                   <Card.Header
                     style={{ backgroundColor: "lightcoral", color: "white", textAlign: 'center' }}
                   >
                     Serviço Id : {servico.servicoId}
                   </Card.Header>
                   <Card.Body>
                   <Card.Text>Serviço: {servico.nome}</Card.Text>
                     <Card.Text>Total Consumido: {servico.totalconsumido}x</Card.Text>
                     <Card.Text>Valor: R$ {servico.valor}</Card.Text>
                   </Card.Body>
                 </Card>
               ))
             ) : (
               <div>Não possui serviço consumido!</div>
             )}
           </>
      )
      break

    case "4":
      content = (
        <>
             {servicos && servicos.length > 0 ? (
               servicos.map((servico, index) => (
                 <Card className="card" key={index}>
                   <Card.Header
                     style={{ backgroundColor: "lightcoral", color: "white" , textAlign: 'center'}}
                   >
                       Cliente Id : {servico.cliId}
                   </Card.Header>
                   <Card.Body>
                   <Card.Text>Nome do Cliente: {servico.nomecliente}</Card.Text>
                    <Card.Text>Serviço: {servico.nome}</Card.Text>
                     <Card.Text>Total Gasto: R$ {servico.valortotal?.toFixed(2)}</Card.Text>
                   </Card.Body>
                 </Card>
               ))
             ) : (
               <div>Nenhum serviço consumido!</div>
             )}
           </>
      );
      break

    case "5":
      content = (
        <>
             {servicos && servicos.length > 0 ? (
               servicos.map((servico, index) => (
                 <Card className="card" key={index}>
                   <Card.Header
                     style={{ backgroundColor: "lightcoral", color: "white", textAlign: 'center' }}
                   >
                       Cliente Id : {servico.cliId}
                   </Card.Header>
                   <Card.Body>
                   <Card.Text>Nome do Cliente: {servico.nomecliente}</Card.Text>
                    <Card.Text>Serviço: {servico.nome}</Card.Text>
                     <Card.Text>Quantidade Consumida: {servico.totalconsumido}</Card.Text>
                   </Card.Body>
                 </Card>
               ))
             ) : (
               <div>Nenhum serviço consumido!</div>
             )}
           </>
      );
      break
      
    default:
        content = null
      break;
  }

  return (
    <div>
      <Seletor opcoes={opcoes} onChange={handleOptionChange} />
      {content}
    </div>
  );
}
export default ListagemServico;
