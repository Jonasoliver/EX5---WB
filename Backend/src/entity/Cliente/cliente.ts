import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import Rg from "./rg";
import Cpf from "./cpf";
import Telefone from "./telefone";
import Venda from "../Venda/venda";

 @Entity({ name: 'cliente'})
class Cliente{
    
    @PrimaryGeneratedColumn({ type: 'int' })
    cliId: number

    @Column({ type: 'varchar', length: 100 })
    nome: string

    @Column({ type: 'varchar', length: 100 })
    nomeSocial: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dataCadastro: Date;

    @Column({ type: 'varchar', length: 100 })
    genero: string

    @OneToOne(()=> Cpf, cpf => cpf.cliente, { onDelete: 'CASCADE'})
    cpf: Cpf

    @OneToMany(()=> Rg, rg => rg.cliente, { onDelete: 'CASCADE'})
    rgs: Rg[] 

    @OneToMany(()=> Telefone, telefone => telefone.cliente, { onDelete: 'CASCADE'})
    telefones: Telefone[] 

    @OneToMany(()=> Venda, venda => venda.cliente, { onDelete: 'CASCADE'})
    vendas: Venda[] 
}

export default Cliente