import { NextFunction, Router, Request, Response} from 'express';
import { getUsuario } from './perfilRepository';

const perfilRouter = Router();

perfilRouter.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const result = await getUsuario(id);
            res.status(200).json(result);
            console.log(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al validar el usuario' });
        }
    }
)

export default perfilRouter