import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Cliente from "../Cliente/cliente";
import Venda from "../Venda/venda";

@Entity({ name: 'servico'})
class Servico{

    @PrimaryGeneratedColumn({ type: 'int' })
    servicoId: number

    // nome valor vendas
    @Column({ type: 'varchar', length: 100 })
    nome: string

    @Column({ type: 'float' })
    valor: number

    @Column({ type: 'int', default: 0})
    vendasServico: number

    @Column({ type: 'boolean', default: true })
    ativo: boolean

    @OneToMany(()=> Venda, venda => venda.servico)
    vendas: Venda[]
}

export default Servico