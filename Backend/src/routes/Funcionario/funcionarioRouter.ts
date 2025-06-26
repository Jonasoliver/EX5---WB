import { Router } from "express";
import FuncionarioController from "../../controller/Funcionario/funcionarioController";

const router = Router()
const funcionarioController = new FuncionarioController()

router.post('/login/funcionario', funcionarioController.logginFuncionario.bind(funcionarioController))

export default router