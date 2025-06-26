import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BarraNavegacao from "../componente/NavBar/barraDeNavegacao";
import Rotas from './rotas';
import 'materialize-css/dist/css/materialize.min.css';
import { useEffect, useState } from 'react';
import M from 'materialize-css';
import { isAuthenticaded } from "../services/Auth/auth";
import LoginPage from "../pages/Login/loginPage";

function Roteador() {
    useEffect(() => {
        M.AutoInit();
    }, []);

    const autenticado = isAuthenticaded()

    const botoes = [
        { nome: 'Cliente', rota: '/' },
        { nome: 'Produto', rota: '/produto' },
        { nome: 'Serviço', rota: '/servico' },
        { nome: 'Registrar Venda', rota: '/venda' }
    ];

    return (
        <BrowserRouter>
            {autenticado ? (
                <>
                    <BarraNavegacao botoes={botoes} />
                    <Rotas />
                </>
            ) : (
                <Routes>
                    <Route path="*" element={<LoginPage />} />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default Roteador;
