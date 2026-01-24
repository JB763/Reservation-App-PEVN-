import {Request, Response} from 'express';
import {prisma} from '../config/database'
import {Role} from "../generated/enums";
import {checkPassword, hashPassword} from '../utils/auth'
import {generateToken} from "../utils/jwt";

//interface para tipado de usuario
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
            return res.status(400).json({error: error.message})
        }
        const hashedPassword = await hashPassword(password);

        //enviamos datos requeridos, los default se asignan solos
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
//login de usuario
export const login = async(req: Request<{}, {}, User>, res: Response) => {
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {email}
    });
    if (!user) {
        const error = new Error("El usuario no se encuentra o no esta registrado");
        return res.status(400).json({error: error.message})
    }
    const isPasswordCorrect = await checkPassword(password, user.password)

    if (!isPasswordCorrect) {
        const error = new Error("Contraseña incorrecta, intente de nuevo");
        return res.status(400).json({error: error.message})
    }
    const token = await generateToken({id: user.id.toString()});
    res.send(token);
}