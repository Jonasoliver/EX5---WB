import { Not } from "typeorm";
import { Connection } from "../../database/data-source";
import Cpf from "../../entity/Cliente/cpf";
import { IBuscaCpf, ICreateCpf, IReadCpf, IUpdateCpf } from "../../Interface/Cliente/ICpf";

class CpfService {
    private cpfRepository = Connection.getRepository(Cpf)

    public async criarCpf(cpfData: ICreateCpf) {
        try {
            const cpf = await this.cpfRepository.findOne({
                where: { valor: cpfData.valor }
            })
            if (cpf) {
                return { success: false, message: `Cpf já cadastrado!` }
            }
            const cpfNovo = await this.cpfRepository.create(cpfData)
            await this.cpfRepository.save(cpfNovo)
            return { success: true, message: `Cpf cadastrado!` }
        } catch (error) {
            console.error(`Erro ao criar cpf: ${error}`)
            return { success: false, message: `Erro ao criar Cpf` }
        }
    }

    public async verCpf(parametro: IBuscaCpf) {
        try {
            let cpf: Cpf
            if (parametro.id) {
                cpf = await this.cpfRepository.findOne({
                    where: { cliente: { cliId: parametro.id } },
                    relations: ["cliente"]
                })
            }
            else if (parametro.valor) {
                cpf = await this.cpfRepository.findOne({
                    where: { valor: parametro.valor }
                })
            }
            if (!cpf) {
                return { success: false, message: `Não encontrado.` }
            }
            return { success: true, message: `Cpf existente!`, data: cpf }
        } catch (error) {
            console.error(`Erro ao ver cpf: ${error}`)
            return { success: false, message: `Erro ao ver Cpf` }
        }
    }
    
    public async atualizaCpf(id: number, cpfUpdateData: IUpdateCpf) {
        try {
            const cpf = await this.cpfRepository.findOne({
                where: { cpfId: Not(id), valor: cpfUpdateData.valor }
            })
            if (cpf) {
                return { success: false, message: `Já cadastrado!` }
            }
            const cpfUpdate = { ...cpf, ...cpfUpdateData }
            await this.cpfRepository.update(id,cpfUpdate)
            return { success: true, message: `Cpf atualizado!` }
        } catch (error) {
            console.error(`Erro ao ver cpf: ${error}`)
            return { success: false, message: `Erro ao ver Cpf` }
        }
    }

    public async listaCpfCliente(id: number) {
        try {
            const cpf = await this.cpfRepository.find({
                where: { cliente: { cliId: id } },
                relations: ["cliente"]
            })
            if (!cpf) {
                return { success: false, message: `CPF não encontrado.` };
            }
            return { success: true, message: `CPF encontrado!`, data: cpf };
        } catch (error) {
            console.error(`Erro ao ver cpf: ${error}`)
            return { success: false, message: `Erro ao ver Cpf` }
        }
    }
}
export default CpfService