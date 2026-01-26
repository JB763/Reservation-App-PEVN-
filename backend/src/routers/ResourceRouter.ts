import {Router} from 'express';
import {createResource, getAll, getResource} from '../handlers/ResourceHandler';
import {body, param} from 'express-validator';
import {handleInputErrors} from "../middleware/validation";


const ResourceRouter = Router();

ResourceRouter.post('/resource',
    body("name")
        .notEmpty().withMessage("Ingrese el nombre del recurso")
        .toLowerCase(),
    body("active")
        .optional()
        .isBoolean(),
    handleInputErrors,
    createResource
);

ResourceRouter.get('/resource', getAll);

ResourceRouter.get('/resource/:id',
    param("id")
        .notEmpty().withMessage("El id es requerido")
        .isNumeric().withMessage("El id proporcionado no es valido"),
    handleInputErrors,
    getResource
);

export default ResourceRouter;