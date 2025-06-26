import { Router } from "express";
import ServicoController from "../../controller/Servico/servicoController";
import { AuthMiddleware } from "../../auth/authMiddleware";

const router = Router()
const servicoController = new ServicoController()
const authFuncionario = AuthMiddleware.authTokenFuncionario
router.post('/criar/servico', authFuncionario,servicoController.criarServico.bind(servicoController))
router.get('/ver/servico/:id', authFuncionario,servicoController.verServico.bind(servicoController))
router.put('/atualizar/servico/:id',authFuncionario, servicoController.atualizarServico.bind(servicoController))
router.delete('/deletar/servico/:id', authFuncionario,servicoController.deletarServico.bind(servicoController))

// listagem
router.get('/listar/servicos', authFuncionario,servicoController.listarServicos.bind(servicoController))
router.post('/listar/mais/consumidos/genero/servicos',authFuncionario, servicoController.listarMaisConsumidosGenero.bind(servicoController))
router.get('/listar/mais/consumidos/servicos',authFuncionario, servicoController.listarMaisConsumidos.bind(servicoController))
router.get('/listar/clientes/mais/consumiram/valor/servicos',authFuncionario, servicoController.listarClientesMaisConsumiramValor.bind(servicoController))
router.get('/listar/clientes/mais/consumiram/quantidade/servicos',authFuncionario, servicoController.listarClientesMaisCondumiramQuantidade.bind(servicoController))

export default router