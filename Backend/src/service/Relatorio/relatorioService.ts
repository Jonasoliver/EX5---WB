import { Connection } from "../../database/data-source";
import Cliente from "../../entity/Cliente/cliente";
import Venda from "../../entity/Venda/venda";
import Produto from "../../entity/Produto/produto";
import Servico from "../../entity/Servico/servico";
import { Repository } from "typeorm";

class RelatorioService {
    private clienteRepository: Repository<Cliente>;
    private vendaRepository: Repository<Venda>;

    constructor() {
        this.clienteRepository = Connection.getRepository(Cliente);
        this.vendaRepository = Connection.getRepository(Venda);
    }

    // 1. Top 10 clientes que mais consumiram produtos ou serviços (quantidade)
    public async top10ClientesMaisConsumiramQuantidade() {
        return this.vendaRepository.createQueryBuilder("venda")
            .leftJoinAndSelect("venda.cliente", "cliente")
            .select(["cliente.cliId", "cliente.nome", "cliente.genero"])
            .addSelect("SUM(venda.quantidade)", "totalConsumido")
            .groupBy("cliente.cliId")
            .orderBy("totalConsumido", "DESC")
            .limit(10)
            .getRawMany();
    }

    // 2. Top 10 clientes por gênero (quantidade)
    public async top10ClientesPorGenero(genero: string) {
        return this.vendaRepository.createQueryBuilder("venda")
            .leftJoinAndSelect("venda.cliente", "cliente")
            .select(["cliente.cliId", "cliente.nome", "cliente.genero"])
            .addSelect("SUM(venda.quantidade)", "totalConsumido")
            .where("cliente.genero = :genero", { genero })
            .groupBy("cliente.cliId")
            .orderBy("totalConsumido", "DESC")
            .limit(10)
            .getRawMany();
    }

    // 3. Listagem geral dos serviços ou produtos mais consumidos (quantidade)
    public async produtosServicosMaisConsumidos() {
        return this.vendaRepository.createQueryBuilder("venda")
            .leftJoinAndSelect("venda.produto", "produto")
            .leftJoinAndSelect("venda.servico", "servico")
            .select(["produto.produtoId", "produto.nome", "servico.servicoId", "servico.nome"])
            .addSelect("SUM(venda.quantidade)", "totalConsumido")
            .groupBy("produto.produtoId")
            .addGroupBy("servico.servicoId")
            .orderBy("totalConsumido", "DESC")
            .getRawMany();
    }

    // 4. Listagem dos serviços ou produtos mais consumidos por gênero
    public async produtosServicosMaisConsumidosPorGenero(genero: string) {
        return this.vendaRepository.createQueryBuilder("venda")
            .leftJoinAndSelect("venda.cliente", "cliente")
            .leftJoinAndSelect("venda.produto", "produto")
            .leftJoinAndSelect("venda.servico", "servico")
            .select(["produto.produtoId", "produto.nome", "servico.servicoId", "servico.nome"])
            .addSelect("SUM(venda.quantidade)", "totalConsumido")
            .where("cliente.genero = :genero", { genero })
            .groupBy("produto.produtoId")
            .addGroupBy("servico.servicoId")
            .orderBy("totalConsumido", "DESC")
            .getRawMany();
    }

    // 5. Top 10 clientes que menos consumiram produtos ou serviços (quantidade)
    public async top10ClientesMenosConsumiramQuantidade() {
        return this.vendaRepository.createQueryBuilder("venda")
            .leftJoinAndSelect("venda.cliente", "cliente")
            .select(["cliente.cliId", "cliente.nome", "cliente.genero"])
            .addSelect("SUM(venda.quantidade)", "totalConsumido")
            .groupBy("cliente.cliId")
            .orderBy("totalConsumido", "ASC")
            .limit(10)
            .getRawMany();
    }

    // 6. Top 5 clientes que mais consumiram em valor
    public async top5ClientesMaisConsumiramValor() {
        return this.vendaRepository.createQueryBuilder("venda")
            .leftJoinAndSelect("venda.cliente", "cliente")
            .leftJoinAndSelect("venda.produto", "produto")
            .leftJoinAndSelect("venda.servico", "servico")
            .select(["cliente.cliId", "cliente.nome", "cliente.genero"])
            .addSelect("SUM(CASE WHEN produto.preco IS NOT NULL THEN produto.preco * venda.quantidade ELSE servico.preco * venda.quantidade END)", "totalGasto")
            .groupBy("cliente.cliId")
            .orderBy("totalGasto", "DESC")
            .limit(5)
            .getRawMany();
    }
}

export default RelatorioService;
