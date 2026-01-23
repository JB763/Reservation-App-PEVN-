import {Request, Response} from 'express';
import {prisma} from '../config/database'
import {Role} from "../generated/enums";
import {hashPassword} from '../utils/auth'

interface User {
    email: string,
    password: string,
    role: Role
}
export const createUser = async(req: Request<{}, {}, User>, res: Response) => {

    try{
        const {email, password, role} = req.body;

        const userExist = await prisma.user.findUnique({
            where: {email}
        });

        if(userExist){
            const error = new Error("El email ingresado ya existe");
            res.status(400).json({error: error.message})
        }
        const hashedPassword = await hashPassword(password);

        await prisma.user.create({
            data: { email,
                    password: hashedPassword,
                    role
            }
        });

        res.status(201).send(`Usuario creado exitosamente`)

    }catch(e){
        const error = new Error("Error al crear usuario")
        return res.status(400).json({error: error.message})
    }

}