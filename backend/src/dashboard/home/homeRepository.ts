import conexion from '../../conexion';

export const getClientes = async (idEntrenador: number) => {
  const sql = `
    SELECT du.*
    FROM entrenadorClientes ec
    JOIN usuarios u ON ec.id_cliente = u.id
    JOIN datosUser du ON u.id_datosUser = du.id
    JOIN roles r ON du.perfil = r.id
    WHERE ec.id_entrenador = ?`;

  const [rows] = await conexion.query(sql, [idEntrenador]);
  return rows;
  
};
