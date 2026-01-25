import {Router} from 'express';
import {createResource} from '../handlers/ResourceHandler';
import {body} from 'express-validator';
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
)

export default ResourceRouter;