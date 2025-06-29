import 'reflect-metadata'
import express  from 'express'
import cors from 'cors'
import { Connection } from './database/data-source'
import RoutesProduto from './routes/Produto/produtoRouter'
import RoutesServico from  './routes/Servico/servicoRouter'
import RoutesCliente from  './routes/Cliente/cliente'
import RoutesFuncionario from './routes/Funcionario/funcionarioRouter'
import RoutesVenda from './routes/Venda/vendaRouter'
import RoutesRelatorio from './routes/Relatorio/relatorioRouter'
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
app.use(RoutesRelatorio)

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
            { nome: 'Alice Martins', nomeSocial: 'Alice', genero: 'Feminino', cpf: { valor: '111111111', dataEmissao: new Date()}, rgs: [{ valor: '222222221', dataEmissao: new Date()}], telefones: [{ ddd: '21', numero: '900001111' }] },
            { nome: 'Bruno Souza', nomeSocial: 'Bruno', genero: 'Masculino', cpf: { valor: '111111112', dataEmissao: new Date()}, rgs: [{ valor: '222222222', dataEmissao: new Date()}], telefones: [{ ddd: '22', numero: '900002222' }] },
            { nome: 'Carla Lima', nomeSocial: 'Carla', genero: 'Feminino', cpf: { valor: '111111113', dataEmissao: new Date()}, rgs: [{ valor: '222222223', dataEmissao: new Date()}], telefones: [{ ddd: '23', numero: '900003333' }] },
            { nome: 'Daniel Pereira', nomeSocial: 'Daniel', genero: 'Masculino', cpf: { valor: '111111114', dataEmissao: new Date()}, rgs: [{ valor: '222222224', dataEmissao: new Date()}], telefones: [{ ddd: '24', numero: '900004444' }] },
            { nome: 'Eduarda Costa', nomeSocial: 'Eduarda', genero: 'Feminino', cpf: { valor: '111111115', dataEmissao: new Date()}, rgs: [{ valor: '222222225', dataEmissao: new Date()}], telefones: [{ ddd: '25', numero: '900005555' }] },
            { nome: 'Felipe Rocha', nomeSocial: 'Felipe', genero: 'Masculino', cpf: { valor: '111111116', dataEmissao: new Date()}, rgs: [{ valor: '222222226', dataEmissao: new Date()}], telefones: [{ ddd: '26', numero: '900006666' }] },
            { nome: 'Gabriela Alves', nomeSocial: 'Gabriela', genero: 'Feminino', cpf: { valor: '111111117', dataEmissao: new Date()}, rgs: [{ valor: '222222227', dataEmissao: new Date()}], telefones: [{ ddd: '27', numero: '900007777' }] },
            { nome: 'Henrique Dias', nomeSocial: 'Henrique', genero: 'Masculino', cpf: { valor: '111111118', dataEmissao: new Date()}, rgs: [{ valor: '222222228', dataEmissao: new Date()}], telefones: [{ ddd: '28', numero: '900008888' }] },
            { nome: 'Isabela Ramos', nomeSocial: 'Isabela', genero: 'Feminino', cpf: { valor: '111111119', dataEmissao: new Date()}, rgs: [{ valor: '222222229', dataEmissao: new Date()}], telefones: [{ ddd: '29', numero: '900009999' }] },
            { nome: 'João Pedro', nomeSocial: 'João', genero: 'Masculino', cpf: { valor: '111111120', dataEmissao: new Date()}, rgs: [{ valor: '222222230', dataEmissao: new Date()}], telefones: [{ ddd: '30', numero: '900001010' }] },
            { nome: 'Karen Freitas', nomeSocial: 'Karen', genero: 'Feminino', cpf: { valor: '111111121', dataEmissao: new Date()}, rgs: [{ valor: '222222231', dataEmissao: new Date()}], telefones: [{ ddd: '31', numero: '900001111' }] },
            { nome: 'Leonardo Barros', nomeSocial: 'Leo', genero: 'Masculino', cpf: { valor: '111111122', dataEmissao: new Date()}, rgs: [{ valor: '222222232', dataEmissao: new Date()}], telefones: [{ ddd: '32', numero: '900002222' }] },
            { nome: 'Marina Torres', nomeSocial: 'Marina', genero: 'Feminino', cpf: { valor: '111111123', dataEmissao: new Date()}, rgs: [{ valor: '222222233', dataEmissao: new Date()}], telefones: [{ ddd: '33', numero: '900003333' }] },
            { nome: 'Nicolas Pinto', nomeSocial: 'Nico', genero: 'Masculino', cpf: { valor: '111111124', dataEmissao: new Date()}, rgs: [{ valor: '222222234', dataEmissao: new Date()}], telefones: [{ ddd: '34', numero: '900004444' }] },
            { nome: 'Olivia Mendes', nomeSocial: 'Olivia', genero: 'Feminino', cpf: { valor: '111111125', dataEmissao: new Date()}, rgs: [{ valor: '222222235', dataEmissao: new Date()}], telefones: [{ ddd: '35', numero: '900005555' }] },
            { nome: 'Paulo Castro', nomeSocial: 'Paulo', genero: 'Masculino', cpf: { valor: '111111126', dataEmissao: new Date()}, rgs: [{ valor: '222222236', dataEmissao: new Date()}], telefones: [{ ddd: '36', numero: '900006666' }] },
            { nome: 'Quésia Lopes', nomeSocial: 'Quésia', genero: 'Feminino', cpf: { valor: '111111127', dataEmissao: new Date()}, rgs: [{ valor: '222222237', dataEmissao: new Date()}], telefones: [{ ddd: '37', numero: '900007777' }] },
            { nome: 'Rafael Nunes', nomeSocial: 'Rafa', genero: 'Masculino', cpf: { valor: '111111128', dataEmissao: new Date()}, rgs: [{ valor: '222222238', dataEmissao: new Date()}], telefones: [{ ddd: '38', numero: '900008888' }] },
            { nome: 'Sabrina Farias', nomeSocial: 'Sabrina', genero: 'Feminino', cpf: { valor: '111111129', dataEmissao: new Date()}, rgs: [{ valor: '222222239', dataEmissao: new Date()}], telefones: [{ ddd: '39', numero: '900009999' }] },
            { nome: 'Thiago Gomes', nomeSocial: 'Thiago', genero: 'Masculino', cpf: { valor: '111111130', dataEmissao: new Date()}, rgs: [{ valor: '222222240', dataEmissao: new Date()}], telefones: [{ ddd: '40', numero: '900001212' }] },
            { nome: 'Ursula Vieira', nomeSocial: 'Ursula', genero: 'Feminino', cpf: { valor: '111111131', dataEmissao: new Date()}, rgs: [{ valor: '222222241', dataEmissao: new Date()}], telefones: [{ ddd: '41', numero: '900002323' }] },
            { nome: 'Vinicius Silva', nomeSocial: 'Vini', genero: 'Masculino', cpf: { valor: '111111132', dataEmissao: new Date()}, rgs: [{ valor: '222222242', dataEmissao: new Date()}], telefones: [{ ddd: '42', numero: '900003434' }] },
            { nome: 'Wesley Martins', nomeSocial: 'Wesley', genero: 'Masculino', cpf: { valor: '111111133', dataEmissao: new Date()}, rgs: [{ valor: '222222243', dataEmissao: new Date()}], telefones: [{ ddd: '43', numero: '900004545' }] },
            { nome: 'Xuxa Souza', nomeSocial: 'Xuxa', genero: 'Feminino', cpf: { valor: '111111134', dataEmissao: new Date()}, rgs: [{ valor: '222222244', dataEmissao: new Date()}], telefones: [{ ddd: '44', numero: '900005656' }] },
            { nome: 'Yuri Batista', nomeSocial: 'Yuri', genero: 'Masculino', cpf: { valor: '111111135', dataEmissao: new Date()}, rgs: [{ valor: '222222245', dataEmissao: new Date()}], telefones: [{ ddd: '45', numero: '900006767' }] },
            { nome: 'Zilda Campos', nomeSocial: 'Zilda', genero: 'Feminino', cpf: { valor: '111111136', dataEmissao: new Date()}, rgs: [{ valor: '222222246', dataEmissao: new Date()}], telefones: [{ ddd: '46', numero: '900007878' }] }
        ];
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