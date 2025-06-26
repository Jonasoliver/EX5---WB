import { Column, Entity, JoinColumn,  OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import Cliente from "./cliente";

@Entity({ name:'cpf' })
class Cpf {

    @PrimaryGeneratedColumn({ type: 'int'})
    cpfId: number

    @Column({ type: 'varchar', length: 11 })
    valor: string

    @Column({ type: 'date' })
    dataEmissao : Date

    @OneToOne(() => Cliente, cliente => cliente.cpf, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'cliId' })
    cliente: Cliente
}
export default Cpf