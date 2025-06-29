import { Router } from "express";
import relatorioController from "../../controller/Relatorio/relatorioController";

const router = Router();

router.get("/top10-quantidade", relatorioController.top10ClientesMaisConsumiramQuantidade);
router.get("/top10-genero/:genero", relatorioController.top10ClientesPorGenero);
router.get("/mais-consumidos", relatorioController.produtosServicosMaisConsumidos);
router.get("/mais-consumidos-genero/:genero", relatorioController.produtosServicosMaisConsumidosPorGenero);
router.get("/top10-menos-quantidade", relatorioController.top10ClientesMenosConsumiramQuantidade);
router.get("/top5-valor", relatorioController.top5ClientesMaisConsumiramValor);

export default router;
