import {Request, Response} from 'express';
import {prisma} from '../config/database';

interface Resource{
    name: string,
    active: boolean
}
//post para crear recursos (cualquier recurso)
export const createResource = async(req: Request<{}, {}, Resource>, res: Response) => {
    try{
        const {name, active} = req.body;
        //validacion de recursos, por nombre
        const resourceExists = await prisma.resource.findFirst({
            where: {name}
        });

        if(resourceExists){
            return res.status(400).json({error: "Un recurso con ese nombre ya existe"});
        }

        const newResource = await prisma.resource.create({
            data: {
                name,
                active
            }
        });

        // status 201 para creación exitosa
        res.status(201).json({message: "El recurso fue creado con éxito", data: newResource});
    }catch(e){
        const error = new Error("El recurso no se pudo crear");
        return res.status(500).json({error: error.message});
    }
}
