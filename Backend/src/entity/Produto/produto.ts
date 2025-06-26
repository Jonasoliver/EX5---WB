import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Venda from "../Venda/venda";

@Entity({ name: 'produto'})
class Produto{

    @PrimaryGeneratedColumn({ type: 'int' })
    produtoId: number

    @Column({ type: 'varchar', length: 100 })
    nome: string

    @Column({ type: 'float' })
    valor: number

    @Column({ type: 'int', default: 0})
    estoque: number

    @Column({ type: 'boolean', default: true })
    ativo: boolean

    @OneToMany(()=> Venda, venda => venda.produto)
    vendas: Venda[]

}

export default Produto