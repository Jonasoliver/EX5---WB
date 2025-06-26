import Gerenciar from "../../componente/Gerenciar/gerenciar";
import ListagemProduto from "../../componente/Listagem/Produto/listagem";
import NavTab from "../../componente/Nav/nav";

function ProdutoPage(){
    return(
        <NavTab ListagemComponente={ListagemProduto} GerenciarComponente={Gerenciar} tipo="produto"/>
    )
}
export default ProdutoPage