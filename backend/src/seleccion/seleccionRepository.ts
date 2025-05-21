import conexion from '../conexion';

export async function guardarCodigo(codigo: string, userId: number) {
  // Verifico si el código ya existe
  const [codigosExistentes]: any = await conexion.query(
    'SELECT * FROM codigos WHERE codigo = ?',
    [codigo]
  );

  if (codigosExistentes.length > 0) {
    throw new Error('El código ya existe');
  }

  // Verifico que el usuario exista en datosUser
  const [usuario]: any = await conexion.query(
    'SELECT * FROM datosUser WHERE id = ?',
    [userId]
  );

  if (usuario.length === 0) {
    throw new Error('El usuario no existe en datosUser');
  }


  // Actualizo el perfil
  await conexion.query(
    'UPDATE datosUser SET perfil = ? WHERE id = ?',
    [1, userId]
  );

  // Inserto el código
  await conexion.query(
    'INSERT INTO codigos (codigo, id_entrenador) VALUES (?, ?)',
    [codigo, userId]
  );
}
