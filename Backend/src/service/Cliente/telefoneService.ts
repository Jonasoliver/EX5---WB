import { Not, Repository } from "typeorm";
import Telefone from "../../entity/Cliente/telefone";
import { Connection } from "../../database/data-source";
import { IBuscaTelefone, ICreatetelefone, IReadtelefone, IUpdatetelefone } from "../../Interface/Cliente/ITefefone";

class TelefoneService {
    private telefoneRepository: Repository<Telefone>
    constructor() {
        this.telefoneRepository = Connection.getRepository(Telefone)
    }

    public async criarTelefone(telefoneData: ICreatetelefone) {
        try {

            const telefone = await this.telefoneRepository.findOne({ where: { numero: telefoneData.numero } });
            if (telefone) {
                return { success: false, message: `Telefone ${telefoneData.numero} já cadastrado.` };
            }
            const novoTelefone = this.telefoneRepository.create(telefoneData);
            await this.telefoneRepository.save(novoTelefone);

            return { success: true, message: `Todos os telefones cadastrados com sucesso!` };
        } catch (error) {
            console.error(`Erro ao criar telefones: ${error}`);
            return { success: false, message: `Erro ao criar telefones.` };
        }
    }

    public async verTelefone(parametro: IBuscaTelefone) {
        try {
            let telefone: IReadtelefone | IReadtelefone[]
            if (parametro.id) {
                telefone = await this.telefoneRepository.find({
                    where: {
                        cliente: {
                            cliId: parametro.id
                        }
                    }, relations: ['cliente']
                })
            }
            else if (parametro.ddd && parametro.numero) {
                telefone = await this.telefoneRepository.findOne({
                    where: {
                        ddd: parametro.ddd,
                        numero: parametro.numero
                    }
                });
            }
            else{
                return { success: false, message: `Parametro inválido.` };
            }

            if (!telefone) {
                return { success: false, message: `Telefone não encontrado.` };
            }
            return { success: true, message: `Telefone existente!`, data: telefone };
        } catch (error) {
            console.error(`Erro ao ver telefone: ${error}`);
            return { success: false, message: `Erro ao ver telefone.` };
        }
    }

    public async atualizaTelefone(id: number, telefoneUpdate: IUpdatetelefone) {
        try {
            const telefone = await this.telefoneRepository.findOne({
                where: { telefoneId: Not(id), ddd: telefoneUpdate.ddd, numero: telefoneUpdate.numero }
            });
            if (telefone) {
                return { success: false, message: `Telefone já cadastrado!` };
            }
            const telUpdate = { ...telefone, ...telefoneUpdate };
            await this.telefoneRepository.update(id, telUpdate)
            return { success: true, message: `Telefone encontrado e atualizado`, data: telUpdate };
        } catch (error) {
            console.error(`Erro ao atualizar telefone: ${error}`);
            return { success: false, message: `Erro ao atualizar telefone.` };
        }
    }
}
export default TelefoneService