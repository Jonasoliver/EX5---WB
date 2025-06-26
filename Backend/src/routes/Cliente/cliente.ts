import { Router } from "express";
import ClienteController from "../../controller/Cliente/clienteController";
import { AuthMiddleware } from "../../auth/authMiddleware";

const router = Router()
const clienteController = new ClienteController()
const authFuncionario = AuthMiddleware.authTokenFuncionario
router.post('/criar/cliente',authFuncionario, clienteController.criarCliente.bind(clienteController))
router.get('/ver/cliente/:id',authFuncionario, clienteController.verCliente.bind(clienteController))
router.put('/atualizar/cliente/:id',authFuncionario, clienteController.atualizarCliente.bind(clienteController))
router.delete('/deletar/cliente/:id',authFuncionario, clienteController.deletarCliente.bind(clienteController))

//listagem
router.get('/listar/clientes',authFuncionario,clienteController.listarClientes.bind(clienteController))
router.post('/listar/clientes/genero',authFuncionario, clienteController.listarClientesGenero.bind(clienteController))

export default router