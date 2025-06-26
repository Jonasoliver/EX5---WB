import { Router } from "express";
import ProdutoController from "../../controller/Produto/produtoController";
import { AuthMiddleware } from "../../auth/authMiddleware";

const router = Router()
const produtoController = new ProdutoController()
const authFuncionario = AuthMiddleware.authTokenFuncionario
router.post('/criar/produto', authFuncionario,produtoController.createProduto.bind(produtoController))
router.get('/ver/produto/:id', authFuncionario,produtoController.verProduto.bind(produtoController))
router.put('/atualizar/produto/:id',authFuncionario, produtoController.atualizarProduto.bind(produtoController))
router.delete('/deletar/produto/:id',authFuncionario, produtoController.deletaProduto.bind(produtoController))

// listagem
router.get('/listar/produtos', authFuncionario,produtoController.listarProdutos.bind(produtoController))
router.post('/listar/mais/consumidos/genero',authFuncionario, produtoController.listarMaisConsumidosGenero.bind(produtoController))
router.get('/listar/mais/consumidos',authFuncionario, produtoController.listarMaisConsumidos.bind(produtoController))
router.get('/listar/clientes/mais/consumidos/valor',authFuncionario, produtoController.listarClientesMaisConsumiramValor.bind(produtoController))
router.get('/listar/clientes/mais/consumidos/quantidade',authFuncionario, produtoController.listarClientesMaisConsumiramQuantidade.bind(produtoController))

export default router