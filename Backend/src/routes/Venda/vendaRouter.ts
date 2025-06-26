import { Router } from "express";
import VendaController from "../../controller/Venda/vendaController";
import { AuthMiddleware } from "../../auth/authMiddleware";

const router = Router()
const vendaController = new VendaController()
const authFuncionario = AuthMiddleware.authTokenFuncionario

router.post('/registra/venda',authFuncionario, vendaController.registrarVenda.bind(vendaController))

export default router