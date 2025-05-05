import {Router} from 'express';
import registroRouter from './registro/registroControler';


const router = Router();

router.use( '/registro', registroRouter ) //Crear esta linea por cada Controller

export default router