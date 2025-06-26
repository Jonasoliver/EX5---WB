import { Repository } from "typeorm";
import Cliente from "../../entity/Cliente/cliente";
import CpfService from "./cpfService";
import RgService from "./rgService";
import TelefoneService from "./telefoneService";
import { Connection } from "../../database/data-source";
import { ICreateCliente, IUpdateCliente } from "../../Interface/Cliente/ICliente";
import { IReadtelefone } from "../../Interface/Cliente/ITefefone";
import { IReadRg } from "../../Interface/Cliente/IRg";

class ClienteService {
    private clienteRespository: Repository<Cliente>
    private cpfService: CpfService
    private rgService: RgService
    private telefoneService: TelefoneService
    constructor() {
        this.clienteRespository = Connection.getRepository(Cliente)
        this.cpfService = new CpfService()
        this.rgService = new RgService()
        this.telefoneService = new TelefoneService()
    }

    public async criarCliente(clienteData: ICreateCliente) {
        try {
            const { nome, nomeSocial, genero, cpf, rgs, telefones } = clienteData;

            // Verificar se o CPF, Rg[] e Telefones[] já existe
            const buscaCpf = await this.cpfService.verCpf({ valor: cpf.valor });
            if (buscaCpf.success) {
                return { success: false, message: buscaCpf.message };
            }

            for (const rg of rgs) {
                const buscaRg = await this.rgService.verRg({ valor: rg.valor });
                if (buscaRg.success) {
                    return { success: false, message: buscaRg.message };
                }
            }

            for (const tel of telefones) {
                const buscaTel = await this.telefoneService.verTelefone({ ddd: tel.ddd, numero: tel.numero })
                if (buscaTel.success) {
                    return { success: false, message: buscaTel.message }
                }
            }

            // Criar o cliente
            const novoCliente = await this.clienteRespository.create({
                nome: nome,
                nomeSocial: nomeSocial,
                genero: genero
            });
            await this.clienteRespository.save(novoCliente);

            // Criar CPF, Rgs e Telefonesv  e associar ao cliente
            const novoCpf = await this.cpfService.criarCpf({
                valor: cpf.valor,
                dataEmissao: cpf.dataEmissao,
                cliente: novoCliente
            });
            if (!novoCpf.success) {
                return { success: false, message: novoCpf.message };
            }

            for (const rg of rgs) {
                const novoRg = await this.rgService.criarRg({
                    valor: rg.valor,
                    dataEmissao: rg.dataEmissao,
                    cliente: novoCliente
                })
                if (!novoRg.success) {
                    return { success: false, message: novoRg.message };
                }
            }

            for (const tel of telefones) {
                const novoTel = await this.telefoneService.criarTelefone({
                    ddd: tel.ddd,
                    numero: tel.numero,
                    cliente: novoCliente
                })
                if (!novoTel.success) {
                    return { success: false, message: novoTel.message };
                }
            }

            return { success: true, message: `Cliente criado com sucesso!` };
        } catch (error) {
            console.error(`Erro ao criar cliente: ${error}`);
            return { success: false, message: `Erro ao criar cliente.` };
        }
    }

    public async atualizaCliente(id: number, clienteUpdateData: IUpdateCliente) {
        try {
            const { cpf, rgs, telefones, ...clienteData } = clienteUpdateData;
            const cliente = await this.clienteRespository.findOne({
                where: { cliId: id }
            })
            
            if (!cliente) {
                return { success: false, message: `Cliente não encontrado.` }
            }

            if(cpf){
                const atualizaCpf = await this.cpfService.atualizaCpf(cpf.cpfId, { valor: cpf.valor, dataEmissao: cpf.dataEmissao})
                console.log('cpf',atualizaCpf.message)
                if(!atualizaCpf.success){
                    return{ success: false, message: atualizaCpf.message }
                }
            }

            if(rgs){
                for (const rg of rgs){
                    const atualizaRgs = await this.rgService.atualizaRg(rg.rgId, { valor: rg.valor, dataEmissao: rg.dataEmissao})
                    if(!atualizaRgs.success){
                        return{ success: false, message: atualizaRgs.message }
                    }
                }
            }

            if(telefones){
                for(const tel of telefones){
                    console.log(tel.telefoneId)
                    const atualizaTelefone = await this.telefoneService.atualizaTelefone(tel.telefoneId, { ddd: tel.ddd, numero: tel.numero })
                    console.log(atualizaTelefone)
                    if(!atualizaTelefone.success){
                        return{ success: false, message: atualizaTelefone.message }
                    }
                }
            }

            const clienteUpdate = { ...cliente, ...clienteData }
            console.log(clienteUpdate)
            await this.clienteRespository.update(id, clienteUpdate)

            return { success: true, message: `Cliente atualizado!` }
        } catch (error) {
            console.error(`Erro ao atualizar cliente: ${error}`);
            return { success: false, message: `Erro ao atualizar cliente.` };
        }
    }

    public async verCliente(id: number) {
        try {
            // busca cliente por id
            const cliente = await this.clienteRespository.findOne({
                where: { cliId: id }
            })
            if (!cliente) {
                return { success: false, message: `Cliente não encontrado.` }
            }

            //busca recupera o cpf
            const buscaCpf = await this.cpfService.verCpf({ id: id });
            if (!buscaCpf.success) {
                return { success: false, message: buscaCpf.message };
            }

            // recupera os rgs do cliente
            const buscaRg = await this.rgService.verRg({ id: id });
            if (!buscaRg.success) {
                return { success: false, message: buscaRg.message };
            }

            let rg : IReadRg | IReadRg[]

            if ( Array.isArray(buscaRg.data) ){
                rg = buscaRg.data.map((rg) => ({
                    rgId: rg.rgId,
                    valor: rg.valor,
                    dataEmissao: rg.dataEmissao
                }))
            }else{
                rg = [{
                    rgId: buscaRg.data.rgId,
                    valor: buscaRg.data.valor,
                    dataEmissao: buscaRg.data.dataEmissao
                }]
            }

            //recupera telefones 
            const buscaTel = await this.telefoneService.verTelefone({ id: id })
            if (!buscaTel.success) {
                return { success: false, message: buscaTel.message }
            }

            let tel: IReadtelefone | IReadtelefone[]

            if( Array.isArray(buscaTel.data)){
                tel = buscaTel.data.map((telefone) => ({
                    telefoneId: telefone.telefoneId,
                    ddd: telefone.ddd,
                    numero: telefone.numero
                }))
            }else{
                tel = [{
                    telefoneId: buscaTel.data.telefoneId,
                    ddd: buscaTel.data.ddd,
                    numero: buscaTel.data.numero
                }]
            }

            const clienteDados = {
                cliId: cliente.cliId,
                nome: cliente.nome,
                nomeSocial: cliente.nomeSocial,
                genero: cliente.genero,
                cpf: {
                    cpfId: buscaCpf.data.cpfId,
                    valor: buscaCpf.data.valor,
                    dataEmissao: buscaCpf.data.dataEmissao
                },
                rgs: rg,
                telefones: tel
            }
            return { success: true, message: `Cliente encotrado!`, data: clienteDados}
        } catch (error) {
            console.error(`Erro ao ver cliente: ${error}`);
            return { success: false, message: `Erro ao ver cliente.` };
        }
    }

    public async deletarCliente(id: number){
        try{
            const cliente = await this.clienteRespository.findOne({
                where: { cliId: id }
            })
            if(!cliente){
                return { success: false, message: `Cliente não encontrado.`}
            }
            await this.clienteRespository.delete(cliente)
            return { success: true, message: `Cliente deletado com sucesso!`}

        }catch(error){
            console.error(`Erro ao deletar cliente: ${error}`);
            return { success: false, message: `Erro ao deletar cliente.` };
        }
    }

    public async listarClientes(){
        try{
            const clientes = await this.clienteRespository.find()
            if(!clientes || clientes.length === 0 ){
                return { success: false, message: `Nenhum cliente cadastrado.`}
            }
    
            return { success: true, message: `Clientes encotrados!`, data: clientes}
        }catch(error){
            console.error(`Erro ao listar clientes: ${error}`);
            return { success: false, message: `Erro ao listar clientes.` };
        }
    }

    public async listarClientesGenero(genero: string){
        try{
            console.log(genero)
            const clientes = await this.clienteRespository.find({
                where: { genero: genero }
            });
            if(!clientes || clientes.length === 0 ){
                return { success: false, message: `Nenhum cliente cadastrado.`}
            }
            console.log(clientes)
            return { success: true, message: `Clientes encotrados!`, data: clientes}

        }catch(error){
            console.error(`Erro ao listar clientes por gênero : ${error}`);
            return { success: false, message: `Erro ao listar clientes por gênero.` };
        }
    }
}
export default ClienteService