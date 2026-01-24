import {Router} from 'express';
import {createUser, login} from '../handlers/UserHandler'
import {body} from 'express-validator';
import {handleInputErrors} from "../middleware/validation";

const userRouter = Router();

userRouter.post('/register',
    body("email")
        .notEmpty().withMessage("Email no debe estar vacío")
        .isEmail()
        .toLowerCase()
        .trim(),
    body("password")
        .notEmpty().withMessage("la contraseña no debe estar vacía")
        .isLength({min: 8}).withMessage("Contraseña debe tener al menos 8 caracteres"),
    body("role")
        .optional()
        .isIn(["USER", "ADMIN"]).withMessage("El Role debe ser ADMIN o USER si se envia"),
    handleInputErrors,
    createUser
);
userRouter.post('/login',
    body("email")
        .notEmpty().withMessage("El email no debe estar vacio")
        .isEmail()
        .toLowerCase()
        .trim(),
    body("password")
        .notEmpty().withMessage("La contraseña no debe estar vacia")
        .isLength({min: 8}),
    handleInputErrors,
    login
)

export default userRouter;