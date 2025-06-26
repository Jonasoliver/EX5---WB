import "reflect-metadata"
import { DataSource } from "typeorm"
import Cpf from "../entity/Cliente/cpf"
import Rg from "../entity/Cliente/rg"
import Telefone from "../entity/Cliente/telefone"
import Cliente from "../entity/Cliente/cliente"
import Produto from "../entity/Produto/produto"
import Servico from "../entity/Servico/servico"
import Funcionario from "../entity/Funcionario/funcionario"
import Venda from "../entity/Venda/venda"
import path from 'path';
import * as dotenv  from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '.env') });

export const Connection = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Cliente, Cpf,Rg,Telefone,Produto,Servico, Funcionario,Venda],
    synchronize: true,
})
