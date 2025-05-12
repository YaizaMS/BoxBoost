import {Router} from 'express';
import registroRouter from './registro/registroController';
import loginRouter from './login/loginController';
import perfilRouter from './dashboard/perfil/perfilController';
import homeRouter from './dashboard/home/homeController';

const router = Router();

//Crear esta linea por cada Controller
router.use( '/registro', registroRouter ) 

router.use('/login', loginRouter )

router.use('/perfil', perfilRouter )

router.use('/home', homeRouter)



export default router