import conexion from '../conexion';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = '-P,4#b&u#p_r7%f?Tr_n*oOj';

export async  function registro(registro : {nombre: string, apellidos: string, email: string, edad: Date}, usuario: {user: string, pass: string}) {
  const conn = await conexion.getConnection();

  try {

     await conn.beginTransaction();

     const [sql1] = await conn.execute(`INSERT INTO datosUser (nombre, apellidos, edad, email) VALUES (?,?,?,?)`,
      [registro.nombre, registro.apellidos, registro.edad, registro.email]
     );
     
     const userId = (sql1 as any).insertId;
     
     const cifrado = await bcrypt.hash(usuario.pass, 10);

     await conn.execute(`INSERT INTO usuarios (id_datosUser, user, pass) VALUES (?,?,?)`, [userId, usuario.user, cifrado]);

     await conn.commit();
     conn.release();
     console.log('Registro exitoso');

     //Aqui se genera el token
     const token = jwt.sign(
      {id: userId, user: usuario.user},
      SECRET_KEY,
      { expiresIn: '1h' }
     );
     return token;

  } catch (error) {
    await conn.rollback();
    conn.release();
    console.log('Error al registrar el usuario', error);
  }

}


/*export function registro(registro : {nombre: string, apellidos: string, email: string, edad: Date}) {
    const sql = `INSERT INTO datosUser (nombre, apellidos, edad, email) 
                VALUES (?,?,?,?)`;
    return conexion.query(sql, [registro.nombre, registro.apellidos, registro.edad, registro.email,]);
}

export function recuperarId() {
  const sql = ``;
  return conexion.query(sql);
}*/


export function loginNuevoUser(usuario : {user: string, pass: string}) {
    const sql = `INSERT INTO usuarios (id_datosUser, iduser, pass)
                VALUES (?,?,?)`;
    return conexion.query(sql, [usuario.user, usuario.pass]);
}

export function validacionUser(user: string) {
    const sql = `Select user from usuarios where user = ?`;

    return conexion.query(sql, [user]);
}

  