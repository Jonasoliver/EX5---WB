import { useState } from "react";
import { Button } from "react-bootstrap";
import { ILoginFuncionario } from "../../Interfaces/funcionario";
import { loginFuncionario } from "../../services/Funcionario/funcionario";
import "./style.css";
import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { login } from "../../services/Auth/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState<ILoginFuncionario>({
    email: "",
    senha: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const resultado = await loginFuncionario(formLogin);
      if (resultado.success) {
        login(resultado.token);
        console.log(resultado);
        alert(resultado.message);
        navigate('/')
        window.location.reload();
      }
    } catch (error: any) {
      alert(`Erro ao realizar login`);
      console.error(`Erro ao realizar login`);
    }
  }


  return (
    <form className="col s12" onSubmit={handleLogin}>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-1 text-center">Realizar Login</h2>
                <p className="text-white-50 mb-1">
                  Por favor, informe seu e-mail e senha!
                </p>

                <MDBInput
                  required
                  wrapperClass="mb-4 w-100"
                  label="E-mail"
                  id="email"
                  type="email"
                  name="email"
                  size="lg"
                  onChange={handleInputChange}
                />
                <MDBInput
                  required
                  wrapperClass="mb-4 w-100"
                  label="Senha"
                  id="senha"
                  type="password"
                  name="senha"
                  size="lg"
                  onChange={handleInputChange}
                />

                <Button variant="danger" type="submit">Login</Button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
}
