import Gerenciar from "../../componente/Gerenciar/gerenciar";
import ListagemCliente from "../../componente/Listagem/Cliente/listagemCliente";
import NavTab from "../../componente/Nav/nav";

function ClientePage(){
    return(
        <NavTab ListagemComponente={ListagemCliente} GerenciarComponente={Gerenciar} tipo="cliente"/>
    )
}
export default ClientePage