import { NextFunction, Router, Request, Response} from 'express';
import { getUsuario, getUsuarios } from './perfilRepository';

const perfilRouter = Router();

perfilRouter.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const result = await getUsuario(+id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al validar el usuario' });
        }
    }
)

perfilRouter.get(
    '/usuarios/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const result = await getUsuarios(+id);
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al encontrar a los usuarios que tienes a cargo' });
        }
    }
)

export default perfilRouter