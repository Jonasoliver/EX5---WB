import 'reflect-metadata'
import express  from 'express'
import cors from 'cors'
import { Connection } from './database/data-source'
import RoutesProduto from './routes/Produto/produtoRouter'
import RoutesServico from  './routes/Servico/servicoRouter'
import RoutesCliente from  './routes/Cliente/cliente'
import RoutesFuncionario from './routes/Funcionario/funcionarioRouter'
import RoutesVenda from './routes/Venda/vendaRouter'
import FuncionarioService from './service/Funcionario/funcionarioService'
import Funcionario from './entity/Funcionario/funcionario'
import Cliente from './entity/Cliente/cliente'
import ClienteService from './service/Cliente/clienteService'
import { ICreateCliente } from './Interface/Cliente/ICliente'
import Servico from './entity/Servico/servico'
import ServicoService from './service/Servico/servicoService'
import { ICreateServico } from './Interface/Servico/IServico'
import Produto from './entity/Produto/produto'
import ProdutoService from './service/Produto/produtoService'
import { ICreateProduto } from './Interface/Produto/IProduto'

const app = express()
app.use(express.json())
app.use(cors())
app.use(RoutesProduto)
app.use(RoutesServico)
app.use(RoutesCliente)
app.use(RoutesFuncionario)
app.use(RoutesVenda)

async function iniciaProjeto(){
    try{
        await Connection.initialize()
        console.log(`Banco de dados conectado :)`)
        const porta = 5000
        app.listen(porta, ()=>{
            console.log(`Servidor rodando na porta ${porta}.`)
        })
        insereFuncionario()
        insereCliente()
        insereServico()
        insereProduto()
    }catch(error){
        console.error(`Erro ao inicializar projeto: ${error}`)
    }
}

iniciaProjeto()

async function insereFuncionario() {
    const funcionarioRepository =  Connection.getRepository(Funcionario)
    const count =  await funcionarioRepository.count()
    const funcionario = await funcionarioRepository.findOne({
        where: { email: 'gersonpenha@gmail.com' }
    })
    const cadastraFuncionario = new FuncionarioService()
    if (count === 0 || !funcionario){
        const dadosFuncionario = {
        nome: 'Gerson',
        sobrenome: 'Penha',
        email: 'gersonpenha@gmail.com',
        senha: 'wb123'
    }
    await cadastraFuncionario.criarFuncionario(dadosFuncionario)
    console.log(`Funcionario Cadastrado!`)
    }
}

async function insereCliente() {
    const clienteRespository =  Connection.getRepository(Cliente)
    const clienteService = new ClienteService()
    const count = await clienteRespository.count()

    if(count === 0 ){
        const clientesFicticios: ICreateCliente[] = [
            { nome: 'João Silva', nomeSocial: 'João', genero: 'Masculino', cpf: { valor: '123456781', dataEmissao: new Date()}, rgs: [{ valor: '987654321', dataEmissao: new Date()}], telefones: [{ ddd: '11', numero: '999991111' }] },
            { nome: 'Maria Oliveira', nomeSocial: 'Maria', genero: 'Feminino', cpf: { valor: '987652322', dataEmissao: new Date()}, rgs: [{ valor: '123456782', dataEmissao: new Date()}], telefones: [{ ddd: '12', numero: '999992222' }] },
            { nome: 'José Santos', nomeSocial: 'José', genero: 'Masculino', cpf: { valor: '987654353', dataEmissao: new Date()}, rgs: [{ valor: '123456783', dataEmissao: new Date()}], telefones: [{ ddd: '13', numero: '999993333' }] },
            { nome: 'Ana Silva', nomeSocial: 'Ana', genero: 'Feminino', cpf: { valor: '987654324', dataEmissao: new Date()}, rgs: [{ valor: '123456784', dataEmissao: new Date()}], telefones: [{ ddd: '35', numero: '999994444' }] },
            { nome: 'Pedro Oliveira', nomeSocial: 'Pedro', genero: 'Masculino', cpf: { valor: '987664325', dataEmissao: new Date()}, rgs: [{ valor: '123456785', dataEmissao: new Date()}], telefones: [{ ddd: '12', numero: '999995555' }] },
            { nome: 'Mariana Santos', nomeSocial: 'Mariana', genero: 'Feminino', cpf: { valor: '987651326', dataEmissao: new Date()}, rgs: [{ valor: '123456786', dataEmissao: new Date()}], telefones: [{ ddd: '13', numero: '999996666' }] },
            { nome: 'Lucas Silva', nomeSocial: 'Lucas', genero: 'Masculino', cpf: { valor: '987654227', dataEmissao: new Date()}, rgs: [{ valor: '123456787', dataEmissao: new Date()}], telefones: [{ ddd: '11', numero: '999997777' }] },
            { nome: 'Carla Oliveira', nomeSocial: 'Carla', genero: 'Feminino', cpf: { valor: '987658328', dataEmissao: new Date()}, rgs: [{ valor: '123456788', dataEmissao: new Date()}], telefones: [{ ddd: '15', numero: '999998888' }] },
            { nome: 'Gabriel Santos', nomeSocial: 'Gabriel', genero: 'Masculino', cpf: { valor: '987954329', dataEmissao: new Date()}, rgs: [{ valor: '123456789', dataEmissao: new Date()}], telefones: [{ ddd: '35', numero: '999999999' }] },
            { nome: 'Fernanda Silva', nomeSocial: 'Fernanda', genero: 'Feminino', cpf: { valor: '987654321', dataEmissao: new Date()}, rgs: [{ valor: '123456790', dataEmissao: new Date()}], telefones: [{ ddd: '11', numero: '888888888' }] },
            { nome: 'Rafael Oliveira', nomeSocial: 'Rafael', genero: 'Masculino', cpf: { valor: '987654322', dataEmissao: new Date()}, rgs: [{ valor: '123456791', dataEmissao: new Date()}], telefones: [{ ddd: '11', numero: '777777777' }] },
            { nome: 'Juliana Santos', nomeSocial: 'Juliana', genero: 'Feminino', cpf: { valor: '987654323', dataEmissao: new Date()}, rgs: [{ valor: '123456792', dataEmissao: new Date()}], telefones: [{ ddd: '35', numero: '666666666' }] },
            { nome: 'Patrícia Oliveira', nomeSocial: 'Patrícia', genero: 'Feminino', cpf: { valor: '987654325', dataEmissao: new Date()}, rgs: [{ valor: '123456794', dataEmissao: new Date()}], telefones: [{ ddd: '11', numero: '444444444' }] },
            { nome: 'Gustavo Santos', nomeSocial: 'Gustavo', genero: 'Masculino', cpf: { valor: '987654326', dataEmissao: new Date()}, rgs: [{ valor: '123456795', dataEmissao: new Date()}], telefones: [{ ddd: '11', numero: '333333333' }] },
            { nome: 'Tatiane Silva', nomeSocial: 'Tatiane', genero: 'Feminino', cpf: { valor: '987654327', dataEmissao: new Date()}, rgs: [{ valor: '123456796', dataEmissao: new Date()}], telefones: [{ ddd: '35', numero: '222222222' }] },
            { nome: 'Ricardo Oliveira', nomeSocial: 'Ricardo', genero: 'Masculino', cpf: { valor: '987654328', dataEmissao: new Date()}, rgs: [{ valor: '123456797', dataEmissao: new Date()}], telefones: [{ ddd: '11', numero: '111111111' }] },
            { nome: 'Aline Santos', nomeSocial: 'Aline', genero: 'Outros', cpf: { valor: '987654329', dataEmissao: new Date()}, rgs: [{ valor: '123456798', dataEmissao: new Date()}], telefones: [{ ddd: '11', numero: '000000000' }] },
            { nome: 'Marcos Silva', nomeSocial: 'Marcos', genero: 'Outros', cpf: { valor: '987654330', dataEmissao: new Date()}, rgs: [{ valor: '123456799', dataEmissao: new Date()}], telefones: [{ ddd: '12', numero: '999999000' }] },
            { nome: 'Carolina Oliveira', nomeSocial: 'Carolina', genero: 'Outros', cpf: { valor: '987654331', dataEmissao: new Date()}, rgs: [{ valor: '123456800', dataEmissao: new Date()}], telefones: [{ ddd: '11', numero: '888888000' }] },
            { nome: 'Raphael Santos', nomeSocial: 'Raphael', genero: 'Outros', cpf: { valor: '987654332', dataEmissao: new Date()}, rgs: [{ valor: '123456801', dataEmissao: new Date()}], telefones: [{ ddd: '11', numero: '777777000' }] },
            { nome: 'Camila Silva', nomeSocial: 'Camila', genero: 'Outros', cpf: { valor: '987654333', dataEmissao: new Date()}, rgs: [{ valor: '123456802', dataEmissao: new Date()}], telefones: [{ ddd: '11', numero: '666666000' }] },
            { nome: 'Diego Oliveira', nomeSocial: 'Diego', genero: 'Outros', cpf: { valor: '987654334', dataEmissao: new Date()}, rgs: [{ valor: '123456803', dataEmissao: new Date()}], telefones: [{ ddd: '11', numero: '555555000' }] }]
        
        for (const cliente of clientesFicticios) {
            await clienteService.criarCliente(cliente)
        }
        console.log(`Clientes adicionados com sucesso!`)
}
    
}

async function insereServico() {
    const servicoRepository = Connection.getRepository(Servico)
    const servicoService = new ServicoService()
    const count = await servicoRepository.count()
    if (count === 0){
        const servicosFicticios: ICreateServico[] = [
            { nome: 'Corte de Cabelo', valor: 50.00 },
            { nome: 'Manicure', valor: 30.00 },
            { nome: 'Pedicure', valor: 35.00 },
            { nome: 'Escova Progressiva', valor: 80.00 },
            { nome: 'Coloração de Cabelo', valor: 60.00 },
            { nome: 'Maquiagem', valor: 45.00 },
            { nome: 'Limpeza de Pele', valor: 70.00 },
            { nome: 'Massagem Relaxante', valor: 90.00 },
            { nome: 'Depilação', valor: 40.00 },
            { nome: 'Tratamento Capilar', valor: 75.00 },
            { nome: 'Design de Sobrancelhas', valor: 25.00 },
            { nome: 'Alongamento de Cílios', valor: 55.00 },
            { nome: 'Penteado', valor: 60.00 },
            { nome: 'Spa dos Pés', valor: 50.00 },
            { nome: 'Spa das Mãos', valor: 40.00 },
            { nome: 'Banho de Lua', valor: 35.00 },
            { nome: 'Hidratação Capilar', valor: 65.00 },
            { nome: 'Tratamento Facial', valor: 80.00 },
            { nome: 'Massagem Modeladora', valor: 85.00 },
            { nome: 'Pelling', valor: 55.00 }
        ];

        for (const servicoData of servicosFicticios) {
            await servicoService.criarServico(servicoData);
        }

        console.log(`Serviços cadastrados!`);
    }
}

async function insereProduto() {
    const produtoRepository = Connection.getRepository(Produto)
    const produtoService = new ProdutoService()
    const count = await produtoRepository.count()

    if (count === 0) {
        const produtosFicticios: ICreateProduto[] = [
            { nome: 'Shampoo', valor: 15.00, estoque: 50 },
            { nome: 'Condicionador', valor: 12.00, estoque: 45 },
            { nome: 'Creme Hidratante', valor: 20.00, estoque: 30 },
            { nome: 'Protetor Solar', valor: 25.00, estoque: 40 },
            { nome: 'Sabonete Facial', valor: 10.00, estoque: 55 },
            { nome: 'Perfume', valor: 50.00, estoque: 20 },
            { nome: 'Maquiagem', valor: 30.00, estoque: 25 },
            { nome: 'Desodorante', valor: 8.00, estoque: 60 },
            { nome: 'Creme para as Mãos', valor: 18.00, estoque: 35 },
            { nome: 'Creme Dental', valor: 5.00, estoque: 70 },
            { nome: 'Fio Dental', valor: 3.00, estoque: 75 },
            { nome: 'Escova de Dente', valor: 7.00, estoque: 65 },
            { nome: 'Esponja de Banho', valor: 6.00, estoque: 80 },
            { nome: 'Gel de Banho', valor: 12.00, estoque: 40 },
            { nome: 'Creme para Pentear', valor: 14.00, estoque: 50 },
            { nome: 'Óleo Corporal', valor: 22.00, estoque: 30 },
            { nome: 'Removedor de Esmalte', valor: 9.00, estoque: 55 },
            { nome: 'Cotonete', valor: 4.00, estoque: 90 },
            { nome: 'Lenços de Papel', valor: 6.00, estoque: 85 },
            { nome: 'Álcool em Gel', valor: 8.00, estoque: 75 },
        ];

        for (const produtoData of produtosFicticios) {
            await produtoService.criarProduto(produtoData);
        }

        console.log(`Produtos cadastrados!`);
    }
}