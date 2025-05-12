import { Router, Request, Response, NextFunction } from "express";
import { getClientes } from "./homeRepository";


const homeRouter = Router();

homeRouter.get(
    '/:idEntrenador',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idEntrenador = req.params.idEntrenador;
            const result = await getClientes(+idEntrenador);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al encontrar los clientes' });
        }
    }
)

export default homeRouter;