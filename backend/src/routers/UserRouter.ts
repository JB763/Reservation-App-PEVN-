import {Router} from 'express';
import {createUser} from '../handlers/UserHandler'
import {body} from 'express-validator';
import {handleInputErrors} from "../middleware/validation";

const userRouter = Router();

userRouter.post('/user',
    body("email")
        .notEmpty().withMessage("Email no debe estar vacío")
        .isEmail()
        .toLowerCase()
        .trim(),
    body("password")
        .notEmpty().withMessage("Password no debe estar vacía")
        .isLength({min: 8}).withMessage("Contraseña debe tener al menos 8 caracteres"),
    body("role")
        .optional()
        .isIn(["USER", "ADMIN"]).withMessage("El Role debe ser ADMIN o USER si se envia"),
    handleInputErrors,
    createUser
);

export default userRouter;