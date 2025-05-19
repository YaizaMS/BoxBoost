import {Router} from 'express';
import registroRouter from './registro/registroController';
import loginRouter from './login/loginController';
import perfilRouter from './dashboard/perfil/perfilController';
import homeRouter from './dashboard/home/homeController';
import seleccionRouter from './seleccion/seleccionController';

const router = Router();

//Crear esta linea por cada Controller

router.use( '/registro', registroRouter ) 

router.use('/login', loginRouter )

router.use('/home', homeRouter)

router.use('/perfil', perfilRouter )

router.use('/seleccion', seleccionRouter )

export default router