import { Collection, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Cliente from "../Cliente/cliente";
import Produto from "../Produto/produto";
import Servico from "../Servico/servico";
import Funcionario from "../Funcionario/funcionario";

@Entity({ name: 'venda' })
class Venda{
    @PrimaryGeneratedColumn({ type: 'int' })
    vendaId: number

    @Column({ type: 'int' })
    quantidade: number

    @ManyToOne(() => Cliente, cliente=> cliente.vendas, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'cliID' })
    cliente: Cliente

    @ManyToOne(()=> Produto, produto => produto.vendas, { nullable: true , onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'produtoId' })
    produto: Produto

    @ManyToOne(()=> Servico, servico => servico.vendas, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'servicoID' })
    servico: Servico

    @ManyToOne(()=> Funcionario, funcioario => funcioario.vendas, {  onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'funcionarioId' })
    funcionario: Funcionario
}

export default Venda