import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { GerenciarProps } from "../Gerenciar/gerenciar";
import './style.css'

interface NavTabProps {
  ListagemComponente: React.ComponentType;
  GerenciarComponente: React.ComponentType<GerenciarProps>;
  tipo: 'cliente' | 'produto' | 'servico'
}

function NavTab({ ListagemComponente, GerenciarComponente, tipo }: NavTabProps) {
  return (
    <Tabs
      defaultActiveKey="Listagem"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="Listagem" title="Listagem">
        <div className="cliente-container">
          <ListagemComponente />
        </div>
      </Tab>
      <Tab eventKey="Gerenciar" title="Gerenciar ">
      <div className="cliente-container">
        <GerenciarComponente tipo={tipo}/>
        </div>
      </Tab>
    </Tabs>
  );
}
export default NavTab
