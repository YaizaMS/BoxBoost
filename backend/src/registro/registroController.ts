import { NextFunction, Router, Request, Response } from 'express';
import { registro, postCuestionario } from './registroRepository';


// Request y Response añadir manualmente
const registroRouter = Router();

registroRouter.post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { nombre, apellidos, email, edad, user, pass } = req.body;
            const {token, id} = await registro({ nombre, apellidos, email, edad }, { user, pass });
            res.status(200).json({token, id});
        } catch (error: any) {
            console.error('Error al registrar el usuario:', error.message);
            res.status(500).json({ error: error.message || 'Error al registrar el usuario' });
        }
    });

registroRouter.post(
    '/cuestionario/:userid',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userid = req.params.userid;
            const token = await postCuestionario(+userid, req.body.cuestionario);
            res.status(200).json(token);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al registrar el usuario' });
        }
    });

/*registroRouter.get(
    '/:user',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.params.user;
            const result = await validacionUser( user );
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al validar el usuario' });
        }
    }
)*/


export default registroRouter;