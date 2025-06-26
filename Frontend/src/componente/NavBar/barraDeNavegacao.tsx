import 'materialize-css/dist/css/materialize.min.css';
import { useEffect } from 'react';
import M from 'materialize-css';
import './style.css';
import { Button } from 'react-bootstrap';
import { logout } from '../../services/Auth/auth';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
    botoes: { nome: string, rota: string }[]
}

function BarraNavegacao({ botoes }: NavBarProps) {
    useEffect(() => {
        let sidenavElems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(sidenavElems);
    }, []);

    const navigate = useNavigate();

    function handleLogout(){
        logout();
        window.location.reload();
    };

    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo" style={{ marginLeft: '2rem', fontSize: '25px' }}>World Beauty</a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {botoes.map((botao) => (
                            <li key={botao.nome}>
                                <a href={botao.rota} style={{ fontSize: '18px' }}>{botao.nome}</a>
                            </li>
                        ))}
                        <Button variant='danger' onClick={handleLogout} style={{ marginRight: '1rem' }}>Sair</Button>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                {botoes.map((botao) => (
                    <li key={botao.nome}>
                        <a href={botao.rota}>{botao.nome}</a>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default BarraNavegacao;


