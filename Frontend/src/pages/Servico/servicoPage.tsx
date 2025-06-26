import Gerenciar from "../../componente/Gerenciar/gerenciar";
import ListagemServico from "../../componente/Listagem/Servico/listagem";
import NavTab from "../../componente/Nav/nav";

function ServicoPage(){
    return(

        <NavTab ListagemComponente={ListagemServico} GerenciarComponente={Gerenciar} tipo="servico"/>
    )
}
export default ServicoPage