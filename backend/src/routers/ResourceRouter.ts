import {Router} from 'express';
import {createResource, getAll, getResource, updateResource} from '../handlers/ResourceHandler';
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

ResourceRouter.put('/resource/:id',
    param("id")
        .notEmpty().withMessage("Se necesita el id del recurso")
        .isNumeric().withMessage("El id proporcionado no es valido"),
    body("name")
        .optional(),
    body("active")
        .optional()
        .isBoolean(),
    handleInputErrors,
    updateResource
)
export default ResourceRouter;