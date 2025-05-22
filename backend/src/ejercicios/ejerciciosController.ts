import { NextFunction, Router, Request, Response } from 'express';
import {  eliminarEjercicio, getClientes2, getEjercicios, getEjerciciosCliente, getInfoCliente, guardarEjercicio } from './ejerciciosRepository';


const ejerciciosRouter = Router();

ejerciciosRouter.get(
    '/ejercicio',
    async ( _: Request, res: Response, next: NextFunction) => {
        try {
            const result = await getEjercicios();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al encontrar los ejercicios' });
        }
    }
)

ejerciciosRouter.get(
    '/info/:idEntrenador/:idCliente',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idEntrenador = req.params.idEntrenador;
            const idCliente = req.params.idCliente;
            const result = await getInfoCliente(+idEntrenador, +idCliente);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al encontrar la info de los clientes' });
        }
    }
)

ejerciciosRouter.get(
    '/select/:idEntrenador',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idEntrenador = req.params.idEntrenador;
            const result = await getClientes2(+idEntrenador);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al encontrar los clientes del entrenador' });
        }
    }
)

ejerciciosRouter.get(
    '/usuarioEjercicios/:idUser/:fecha',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idUser = req.params.idUser;
            const fecha = req.params.fecha;
            const result = await getEjerciciosCliente(+idUser, new Date(fecha));
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al encontrar los clientes del entrenador' });
        }
    }
)

ejerciciosRouter.post(
  '/guardarEjercicio/:user_id/:fecha',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.params.user_id;
        const fecha = req.params.fecha;
        const { ejercicio_id, series, repeticiones, peso, tiempo, notas } = req.body;

      const result = await guardarEjercicio(+user_id, new Date(fecha), { ejercicio_id, series, repeticiones, peso, tiempo, notas });

      res.status(201).json({ message: 'Ejercicio guardado', result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al guardar el ejercicio' });
    }
  }
);

ejerciciosRouter.delete(
  '/eliminarEjercicio/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await eliminarEjercicio(+id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al eliminar el ejercicio' });
    }
  }
)

export default ejerciciosRouter;