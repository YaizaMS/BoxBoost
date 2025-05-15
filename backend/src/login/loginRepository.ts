import conexion from '../conexion';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = '-1$5/iW@b&u#p_r7%f?@r_n*o0j';

export async function login(usuario: { user: string, pass: string }) {
    const conn = await conexion.getConnection();
    try {
      console.log(usuario);
         const [rows]: any = await conn.execute(
            `select * 
            from usuarios U 
            left join datosUser DU ON DU.id = U.id_datosUser 
            where user = ?;`,
            [usuario.user]
         );

         const usu = rows[0];
         if(!usu) throw new Error('Usuario no encontrado');

         const cifrado = await bcrypt.compare(usuario.pass, usu.pass);
         if(!cifrado) throw new Error('Contraseña incorrecta');

         const token = jwt.sign({
            id: usu.id_datosUser, 
            usuario: usu.user,
            pass: usu.pass,
            email: usu.email,
            edad: usu.edad,
            nombre: usu.nombre,
            apellidos: usu.apellidos,
            perfil: usu.perfil,
            proposito: usu.proposito
         },
            SECRET_KEY,
            { expiresIn: '1h' }
         );
         return { token };
    } catch (error) {
        
    }
}
