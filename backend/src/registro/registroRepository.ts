import conexion from '../conexion';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = '-P,4#b&u#p_r7%f?Tr_n*oOj';

export async function registro(
  registro: { nombre: string, apellidos: string, email: string, edad: Date },
  usuario: { user: string, pass: string }) {
  const conn = await conexion.getConnection();
  try {

    await conn.beginTransaction();

    // Verifica si el usuario ya existe
    const [usuariosEncontrados]: any = await conn.execute(
      `select * 
          from usuarios 
          where user = ?;`,
      [usuario.user]
    )

    if (usuariosEncontrados.length > 0) throw new Error('El usuario ya existe');


    // Inserta el usuario en la tabla de dardosUser
    const [sql2] = await conn.execute(
      `INSERT INTO datosUser (nombre, apellidos, edad, email) VALUES (?,?,?,?,)`,

      [registro.nombre, registro.apellidos, registro.edad, registro.email]
    );

    const userId = (sql2 as any).insertId;

    const cifrado = await bcrypt.hash(usuario.pass, 10);

    // Inserta el usuario en la tabla de usuarios
    await conn.execute(
      `INSERT INTO usuarios (id_datosUser, user, pass) VALUES (?,?,?)`,

      [userId, usuario.user, cifrado]
    );

    await conn.commit();
    conn.release();

    //Aqui se genera el token
    const token = jwt.sign({
      id: userId,
      usuario: usuario.user,
      email: registro.email,
      edad: registro.edad,
      nombre: registro.nombre,
      apellidos: registro.apellidos
    },
      SECRET_KEY, { expiresIn: '1h' });

    return { token, id: userId };

  } catch (error: any) {
    await conn.rollback();
    conn.release();
    throw new Error(error.message || 'Error al registrar el usuario');
  }

}

export async function postCuestionario(
  userId: number,
  cuestionario: {
    codigo: number,
    genero: string,
    objetivo: string,
    nivel: string,
    diasSeleccionados: string[],
    frecuencia: number,
    material: string,
    observaciones: string
  }
): Promise<any> {

  // Verifica si el código de entrenador existe
  const [codigoValido]: any = await conexion.query(
    'SELECT * FROM codigos WHERE codigo = ?',
    [cuestionario.codigo]
  );

  if (!codigoValido || codigoValido.length === 0) {
    throw new Error('Código de entrenador inválido');
  }

  const idEntrenador = codigoValido[0].id_entrenador;

  // Comprueba si ya existe la relación para evitar duplicados
  const [existeRelacion]: any = await conexion.query(
    'SELECT * FROM entrenadorClientes WHERE id_entrenador = ? AND id_cliente = ?',
    [idEntrenador, userId]
  );

  // Si no existe, inserta la relación
  if (!existeRelacion || existeRelacion.length === 0) {
    await conexion.query( 
      'INSERT INTO entrenadorClientes (id_entrenador, id_cliente) VALUES (?, ?)',
      [idEntrenador, userId]
    );
  }

    await conexion.query(
    'UPDATE datosUser SET perfil = ? WHERE id = ?',
    [2, userId]
  );
  // Guarda la informacion del usuario en la tabla de cuestionarios
  const sql = `
    INSERT INTO cuestionarios (
      user_id, genero, objetivo, nivel_fitness, disponibilidad, frecuencia, material, observaciones
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  return conexion.query(sql, [userId, cuestionario.genero, cuestionario.objetivo, cuestionario.nivel, 
    JSON.stringify(cuestionario.diasSeleccionados), // Guarda el array como string
    cuestionario.frecuencia, cuestionario.material, cuestionario.observaciones
  ]);
}




/*
export function loginNuevoUser(usuario : {user: string, pass: string}) {
    const sql = `INSERT INTO usuarios (id_datosUser, iduser, pass)
                VALUES (?,?,?)`;
    return conexion.query(sql, [usuario.user, usuario.pass]);
}

export function validacionUser(user: string) {
    const sql = `Select user from usuarios where user = ?`;

    return conexion.query(sql, [user]);
}*/

