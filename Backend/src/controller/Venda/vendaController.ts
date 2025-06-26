import { Request, Response } from "express";
import VendaService from "../../service/Venda/vendaService";
import { ICreateVenda } from "../../Interface/Venda/IVenda";

class VendaController{
    private vendaService: VendaService
    constructor(){
        this.vendaService = new VendaService()
    }

    public async registrarVenda(req: Request, res: Response){
        try{
            const vendaData : ICreateVenda = req.body
            const resultado = await this.vendaService.cadastraVenda(vendaData)
            if(!resultado.success){
                return res.status(400).json({ message: resultado.message })
            }
            return res.status(201).json(resultado)
        }catch(error){
            console.error(`Erro ao registrar uma venda : ${error}`)
            return res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }
}

export default VendaController