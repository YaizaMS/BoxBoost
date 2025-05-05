import { NextFunction, Router, Request, Response} from 'express';
import { registro } from './registroRepository';


// Request y Response añadir manualmente
const registroRouter = Router();

registroRouter.post(
    '/', 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { nombre, apellidos, email, edad} = req.body;
            const result = await registro({ nombre, apellidos, email, edad });
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al registrar el usuario' });
        }
});


export default registroRouter;