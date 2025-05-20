import conexion from '../../conexion';

export const getClientes = async (idEntrenador: number) => {
  const sql = `SELECT 
                  du.id AS id_cliente,
                  du.nombre,
                  du.apellidos,
                  du.edad,
                  c.objetivo,
                  c.nivel_fitness,
                  c.disponibilidad,
                  c.frecuencia,
                  c.observaciones,
                  c.genero,
                  c.material,
                  de.dia
                FROM entrenadorClientes ec
                JOIN datosUser du ON ec.id_cliente = du.id
                LEFT JOIN usuarios u ON u.id_datosUser = du.id
                LEFT JOIN roles r ON du.perfil = r.id
                LEFT JOIN cuestionarios c ON c.user_id = du.id
                LEFT JOIN diasEntreno de ON de.id_cliente = du.id
                WHERE ec.id_entrenador = ?
                GROUP BY du.id
                ORDER BY du.id, de.dia;`;

  const [rows] = await conexion.query(sql, [idEntrenador]);
  return rows;
  
};
