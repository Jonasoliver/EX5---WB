import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Cliente from "./cliente";

@Entity({ name:'telefone' })
class Telefone {
    @PrimaryGeneratedColumn({ type: 'int'})
    telefoneId: number

    @Column({ type: 'varchar'})
    ddd: string

    @Column({ type: 'varchar' })
    numero : string

    @ManyToOne(() => Cliente, cliente => cliente.telefones, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'cliId' })
    cliente: Cliente
}
export default Telefone