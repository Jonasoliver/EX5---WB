import { useState } from "react";
import { Button } from "react-bootstrap";
import View from "../View/view";
import "./style.css";
import { verCliente } from "../../services/Cliente/cliente";
import { IVerCliente } from "../../Interfaces/cliente";
import { IReadProduto } from "../../Interfaces/produto";
import { verProduto } from "../../services/Produto/produto";
import { IReadServico } from "../../Interfaces/servico";
import { verServico } from "../../services/Servico/servico";

interface FormBuscaProps {
  tipo: "cliente" | "produto" | "servico";
}

function FormularioBusca({ tipo }: FormBuscaProps) {
  const [identificador, setIdentificador] = useState<string>("");
  const [resultado, setResultado] = useState<
    IVerCliente | IReadProduto | IReadServico | null
  >(null);
  const [buscaRealizada, setBuscaRealizada] = useState<boolean>(false);

  function handleIdentificadorChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setResultado(null);
    setIdentificador(event.target.value);
  }

  async function handleSearch() {
    setBuscaRealizada(false)
    try {
      let resultadoBusca;
      switch (tipo) {
        case "cliente":
          resultadoBusca = await verCliente(identificador)
          break;
        case "produto":
          resultadoBusca = await verProduto(identificador)
          break;
        case "servico":
          resultadoBusca = await verServico(identificador)
          break;
      }
      setBuscaRealizada(true)
      if (resultadoBusca && resultadoBusca.success) {
        setResultado(null)
        setResultado(resultadoBusca.data)
      } else {
        setResultado(null)
      }
    } catch (error) {
      console.error(error);
      setBuscaRealizada(true);
      setResultado(null);
    }
  }

  function renderResultado() {
    switch (tipo) {
      case "cliente":
        return <View tipo="cliente" cliente={resultado as IVerCliente} />;
      case "produto":
          return <View tipo="produto" produto={resultado as IReadProduto} />;
      case "servico":
        return <View tipo="servico" servico={resultado as IReadServico} />;
    }
  }

  return (
    <>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input
                required
                id="identificador"
                type="text"
                className="validate"
                onChange={handleIdentificadorChange}
              />
              <label htmlFor="identificador">
                Digite o número identificador (ID)
              </label>
            </div>
          </div>
          <div className="col s12">
            <Button
              type="button"
              variant="danger"
              onClick={handleSearch}
              name="action"
            >
              Buscar
            </Button>
          </div>
        </form>
        {buscaRealizada && resultado === null ? (
          <div>Não encontrado! Verifique os dados que estão sendo enviados.</div>
        ) : (
          renderResultado()
        )}
      </div>
    </>
  );
}

export default FormularioBusca;