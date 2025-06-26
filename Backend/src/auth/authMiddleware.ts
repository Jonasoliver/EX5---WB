import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export class AuthMiddleware{
    static async authTokenFuncionario(req: Request, res: Response, next: NextFunction){
        try{
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            const secret = process.env.SECRET;

            if (!token) {
                return res.status(401).json({ success: false, message: `Token de autenticação não fornecido` });
            }

            if (!secret) {
                return res.status(500).json({ success: false, message: `Erro interno do servidor` });
            }
            
            jwt.verify(token, secret) 
            next()
        }catch(error){
            console.error(`Erro ao verificar token: ${error}`)
            return res.status(500).json({ message: `Token inválido!`})
        }
    }
}