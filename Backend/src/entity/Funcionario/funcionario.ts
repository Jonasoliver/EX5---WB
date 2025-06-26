import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Venda from "../Venda/venda";

@Entity({ name: 'funcionario' })
class Funcionario{
    @PrimaryGeneratedColumn({ type: 'int' })
    funcionarioId: number

    @Column({ type: 'varchar', length: 100 })
    nome: string

    @Column({ type: "varchar", length: 100})
    sobrenome: string

    @Column({ type: 'varchar', length: 255})
    email: string

    @Column({ type: 'varchar', length: 250})
    senha: string

    @OneToMany(()=> Venda, venda => venda.funcionario)
    vendas: Venda[]
}
export default Funcionario