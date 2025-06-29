import { Request, Response } from "express";
import RelatorioService from "../../service/Relatorio/relatorioService";

const relatorioService = new RelatorioService();

const relatorioController = {
    async top10ClientesMaisConsumiramQuantidade(req: Request, res: Response) {
        const result = await relatorioService.top10ClientesMaisConsumiramQuantidade();
        return res.json(result);
    },
    async top10ClientesPorGenero(req: Request, res: Response) {
        const { genero } = req.params;
        const result = await relatorioService.top10ClientesPorGenero(genero);
        return res.json(result);
    },
    async produtosServicosMaisConsumidos(req: Request, res: Response) {
        const result = await relatorioService.produtosServicosMaisConsumidos();
        return res.json(result);
    },
    async produtosServicosMaisConsumidosPorGenero(req: Request, res: Response) {
        const { genero } = req.params;
        const result = await relatorioService.produtosServicosMaisConsumidosPorGenero(genero);
        return res.json(result);
    },
    async top10ClientesMenosConsumiramQuantidade(req: Request, res: Response) {
        const result = await relatorioService.top10ClientesMenosConsumiramQuantidade();
        return res.json(result);
    },
    async top5ClientesMaisConsumiramValor(req: Request, res: Response) {
        const result = await relatorioService.top5ClientesMaisConsumiramValor();
        return res.json(result);
    }
};

export default relatorioController;
