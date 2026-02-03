import {Router} from 'express';
import {
    createResource,
    deleteResource,
    getAll,
    getResource,
    updateResource
} from '../handlers/ResourceHandler';
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
);
ResourceRouter.delete('/resource/:id',
    param("id")
        .notEmpty().withMessage("El id no debe estar vacio")
        .isNumeric().withMessage("El id proporcionado no es valido"),
    handleInputErrors,
    deleteResource
)
export default ResourceRouter;