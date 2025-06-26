import { useState } from "react";
import Seletor from "../Seletor/seletor";
import FormularioCadastro from "../Formulario/formularioCadastro";
import FormularioBusca from "../Formulario/formularioBusca";
import 'bootstrap/dist/css/bootstrap.min.css';


 export interface GerenciarProps{
  tipo: string;
}

function Gerenciar({ tipo }: GerenciarProps) {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string>("");

  function handleOptionChange(opcaoSelecionada: string) {
    setOpcaoSelecionada(opcaoSelecionada);
  }

  let options: { value: string; label: string }[] = [];

  let content;

  switch (tipo) {
    case "cliente":
      options = [
        { value: "1", label: "Cadastrar Cliente" },
        { value: "2", label: "Ver Cliente" },
      ];
      switch (opcaoSelecionada) {
        case "1":
          content = <FormularioCadastro tipo="cliente"/>
          break;
        case "2":
          content = <FormularioBusca tipo="cliente"/>
          break;
        default:
          content = null
          break;
      }
      break;
    case "produto":
      options = [
        { value: "1", label: "Cadastrar Produto" },
        { value: "2", label: "Ver Produto" },
      ];
      switch (opcaoSelecionada) {
        case "1":
          content = <FormularioCadastro tipo="produto"/>
          break;
        case "2":
          content = <FormularioBusca tipo="produto"/>
          break;
      }
      break;
    case "servico":
      options = [
        { value: "1", label: "Cadastrar Serviço" },
        { value: "2", label: "Ver Serviço" },
      ];
      switch (opcaoSelecionada) {
        case "1":
          content = <FormularioCadastro tipo="servico"/>
          break;
        case "2":
          content = <FormularioBusca tipo="servico"/>
          break;
        default:
          content = null
          break;
      }
      break;
    default:
      content = null;
      break;
  }

  return (
    <>
      <Seletor opcoes={options} onChange={handleOptionChange} />
      {content}
    </>
  );
}
export default Gerenciar