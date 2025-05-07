import { NextFunction, Router, Request, Response} from 'express';
import { login } from './loginRepository';

const loginRouter = Router();

loginRouter.post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user, pass } = req.body;
            const token = await login({user, pass});
            res.status(200).json(token);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al validar el usuario' });
        }
    }
)


export default loginRouter