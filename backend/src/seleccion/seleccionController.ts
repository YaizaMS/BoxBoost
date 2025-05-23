import { NextFunction, Router, Request, Response } from 'express';
import { guardarCodigo } from './seleccionRepository';


const seleccionRouter = Router();

seleccionRouter.get(
    '/:codigo/:userId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const codigo = req.params.codigo;
            const userId = req.params.userId;
            const result = await guardarCodigo(codigo, +userId);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error codigo' });
        }
    }
);


export default seleccionRouter;