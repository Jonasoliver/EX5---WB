import { Repository } from "typeorm";
import Funcionario from "../../entity/Funcionario/funcionario";
import { Connection } from "../../database/data-source";
import { ICreateFuncionario, ILoginFuncionario } from "../../Interface/Funcionario/IFuncionario";
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class  FuncionarioService{
    private funcionarioRepository: Repository<Funcionario>
    constructor(){
        this.funcionarioRepository = Connection.getRepository(Funcionario)
    }

    public async criarFuncionario(funcionarioData: ICreateFuncionario){
        try{
            const funcionario = await this.funcionarioRepository.findOne({
                where: { email: funcionarioData.email }
            })
            if(funcionario){
                return { success: false, message: `Funcionario já cadastrado!`}
            }
            const senhaCriptografada = await bcrypt.hash(funcionarioData.senha, 10)
            funcionarioData.senha = senhaCriptografada
            const novoFuncionario = await this.funcionarioRepository.create(funcionarioData)
            await this.funcionarioRepository.save(novoFuncionario)
            return { success: true, message: `Funcionario Cadastrado! `}
        }catch(error){
            console.error(`Erro ao criar funcionario: ${error}`)
            return { success: false, message: `Erro ao criar funcionario.`}
        }
    }

    public async loginFuncionario(loginData: ILoginFuncionario){
        try{
            const { email, senha } = loginData
            const funcionario = await this.funcionarioRepository.findOne({
                where: { email: email }
            })
            if(!funcionario){
                return { success: false, message: `Usuario não cadastrado!`}
            }
            if(!bcrypt.compareSync(loginData.senha, funcionario.senha)){
                return { success: false, message: `Dados incorretos!` }
            }
            const senhaSecreta = process.env.SECRET
            const token = jwt.sign({ id: funcionario.funcionarioId }, senhaSecreta, { expiresIn: '5h' }  )
            return { success: true, message: `Autenticação realizada com sucesso!`, token}
        }catch(error){
            console.error(`Erro ao realizar login do funcionario: ${error}`)
            return { success: false, message: `Erro ao realizar login do funcionario.`}
        }
    }
}

export default FuncionarioService