import jwt, {JwtPayload} from 'jsonwebtoken';

export const generateToken = async(payload: JwtPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '180d'
    });
}