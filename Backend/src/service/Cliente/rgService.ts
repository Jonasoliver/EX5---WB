import { Not, Repository } from "typeorm";
import Rg from "../../entity/Cliente/rg";
import { Connection } from "../../database/data-source";
import { IBuscaRgs, ICreateRg, IReadRg, IUpdateRg } from "../../Interface/Cliente/IRg";

class RgService {
    private rgRepository: Repository<Rg>
    constructor() {
        this.rgRepository = Connection.getRepository(Rg)
    }

    public async criarRg(rgData: ICreateRg) {
        try {

            const rg = await this.rgRepository.findOne({ where: { valor: rgData.valor } });
            if (rg) {
                return { success: false, message: `Rg ${rgData.valor} já cadastrado.` };
            }
            const rgNovo = this.rgRepository.create(rgData);
            await this.rgRepository.save(rgNovo);

            return { success: true, message: `Todos os Rgs cadastrados com sucesso!` };
        } catch (error) {
            console.error(`Erro ao criar Rgs: ${error}`);
            return { success: false, message: `Erro ao criar Rgs.` };
        }
    }

    public async verRg(parametro: IBuscaRgs) {
        try {
            let rg : IReadRg | IReadRg[]
            if (parametro.valor){
                rg = await this.rgRepository.findOne({
                where: { valor: parametro.valor }
            })
            }
            else if (parametro.id){
                rg = await this.rgRepository.find({
                    where: { cliente: { cliId: parametro.id} },
                    relations: ['cliente']
                })
            }
            
            if (!rg) {
                return { success: false, message: `Rg não encontrado.` }
            }
            return { success: true, message: `Rg existente!`, data: rg }
        } catch (error) {
            console.error(`Erro ao ver rg: ${error}`)
            return { success: false, message: `Erro ao ver rg.` }
        }
    }

    public async atualizaRg(id: number, rgUpdateData: IUpdateRg) {
        try {
            const rg = await this.rgRepository.findOne({
                where: { rgId: Not(id), valor: rgUpdateData.valor }
            })
            if (rg) {
                return { success: false, message: `Rg já cadastrado.` }
            }
            const rgUpdate = { ...rg, ...rgUpdateData }
            await this.rgRepository.update(id,rgUpdate)
            return { success: true, message: `Rg atualizado.` }
        } catch (error) {
            console.error(`Erro ao atualizar rg: ${error}`)
            return { success: false, message: `Erro ao atualizar rg.` }
        }
    }

    public async listaRgCliente(id: number) {
        try {
            const rgs = await this.rgRepository.find({
                where: { cliente: { cliId: id } },
                relations: ["cliente"]
            })
            if (!rgs || rgs.length === 0 ) {
                return { success: false, message: `Rgs não encontrado.` }
            }
            return { success: true, message: `Rgs encontrados!`, data: rgs }
        } catch (error) {
            console.error(`Erro ao atualizar rg: ${error}`)
            return { success: false, message: `Erro ao atualizar rg.` }
        }
    }
}
export default RgService