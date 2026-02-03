import {Request, Response} from 'express';
import {prisma} from '../config/database';

interface Resource{
    id: string
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
// traer todos los recursos
export const getAll = async(req: Request<{}, {}, Resource>, res:Response) => {
    try {
        const resources = await prisma.resource.findMany();
        res.status(200).json(resources)
    }catch(e){
        const error = new Error("No se pudo obtener ningun recurso");
        return res.status(500).json({error: error.message})
    }
}
//traer resource por id
export const getResource = async(req: Request<{id: string}>, res: Response) => {
    try{
        const {id} = req.params;
        const idNumber = parseInt(id)
        const resource = await prisma.resource.findUnique({
            where: {id: idNumber}
        })
        if(!resource){
            return res.status(400).json({message: "El recurso no fue encontrado"});
        }
        res.status(200).json(resource)
    }catch(e){
        const error = new Error("No se pudo obtener el recurso");
        return res.status(500).json({error: error.message})
    }
}
// editar resource
export const updateResource = async(req: Request<{id: string},{},Resource>, res: Response) => {
    try{
        const {id} = req.params;
        const {name, active} = req.body;
        const idNumber = parseInt(id);
        const resource = await prisma.resource.findUnique({
            where: {id: idNumber}
        });
        if(!resource){
            const error = new Error("El recurso no fue encontrado");
            return res.status(400).json({error: error.message});
        }
        await prisma.resource.update({
            where: {id: idNumber},
            data: {
                name,
                active
            }
        })
        return res.status(200).json({message: "El recurso fue actualizado con exito"});
    }catch(e){
        const error = new Error("No se pudo actualizar con exito");
        return res.status(400).json({error: error.message});
    }
}

//delete resource
export const deleteResource = async(req: Request<{id: string}>, res: Response) => {
    try {
        const {id} = req.params;
        const idNumber = parseInt(id)
        const resource = await prisma.resource.findUnique({
            where: {id: idNumber}
        })
        if(!resource){
            return res.status(400).json({message: "El recurso no se encontró"});
        }
        await prisma.resource.delete({
            where: {id: idNumber}
        })
        return res.status(200).json({message: "El recurso fue eliminado exitosamente"});
    }
    catch(e){
        const error = new Error("Error al eliminar recurso");
        return res.status(400).json({error: error.message})
    }
}

