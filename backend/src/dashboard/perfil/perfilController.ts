import { NextFunction, Router, Request, Response} from 'express';
import { eliminarCuenta, eliminarEntrenadorYClientes, getUsuarioCliente, getUsuarioEntrenador, getUsuarios } from './perfilRepository';

const perfilRouter = Router();

perfilRouter.get(
    '/entrenador/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const result = await getUsuarioEntrenador(+id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al validar el usuario' });
        }
    }
)

perfilRouter.get(
    '/cliente/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const result = await getUsuarioCliente(+id);
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
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al encontrar a los usuarios que tienes a cargo' });
        }
    }
)

perfilRouter.delete(
    '/eliminarEntrenadorYClientes/:id', 
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const result = await eliminarEntrenadorYClientes(+id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar la cuenta' });
    }
})

perfilRouter.delete(
    '/eliminarCuenta/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const result = await eliminarCuenta(+id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al eliminar la cuenta' });
        }
    }
)

export default perfilRouter