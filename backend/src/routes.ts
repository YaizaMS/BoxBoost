import {Router} from 'express';
import registroRouter from './registro/registroController';
import loginRouter from './login/loginController';

const router = Router();

//Crear esta linea por cada Controller
router.use( '/registro', registroRouter ) 

router.use('/login', loginRouter )



export default router