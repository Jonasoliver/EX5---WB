import { Route, Routes } from "react-router-dom";
import ClientePage from "../pages/Cliente/clientePage";
import ProdutoPage from "../pages/Produto/produtoPage";
import ServicoPage from "../pages/Servico/servicoPage";
import VendaPage from '../pages/Venda/vendaPage';
import LoginPage from "../pages/Login/loginPage";
import { isAuthenticaded } from "../services/Auth/auth";

function Rotas() {
    const autenticado = isAuthenticaded();
    
    return (
        <Routes>
            {autenticado ? (
                <>
                    <Route path="/" element={<ClientePage />} />
                    <Route path="/produto" element={<ProdutoPage />} />
                    <Route path="/servico" element={<ServicoPage />} />
                    <Route path="/venda" element={<VendaPage />} />
                </>
            ) : (
                <Route path="*" element={<LoginPage />} />
            )}
        </Routes>
    );
}

export default Rotas;

