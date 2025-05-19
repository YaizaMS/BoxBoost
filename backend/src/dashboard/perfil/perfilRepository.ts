import conexion from '../../conexion';

export async function getUsuarioEntrenador(id: number) {
    const sql = `select * from datosUser where id = ?;`;

    const [rows] = await conexion.query(sql, [id]);
    return rows;
}

export async function getUsuarioCliente(id: number) {
    const sql = `SELECT 
                    DU.*, 
                    C.objetivo, 
                    C.nivel_fitness, 
                    C.disponibilidad, 
                    C.observaciones,
                    ENT.nombre AS nombre_entrenador,
                    ENT.apellidos AS apellidos_entrenador
                    FROM datosUser DU
                    LEFT JOIN cuestionarios C ON C.user_id = DU.id
                    LEFT JOIN entrenadorClientes EC ON EC.id_cliente = DU.id
                    LEFT JOIN datosUser ENT ON ENT.id = EC.id_entrenador
                    WHERE DU.id = ?;`;

    const [rows] = await conexion.query(sql, [id]);
    return rows;

}

export async function getUsuarios(id: number) {
    const sql = ` SELECT du.*
                        FROM entrenadorClientes ec
                        JOIN usuarios u ON ec.id_cliente = u.id
                        JOIN datosUser du ON u.id_datosUser = du.id
                        JOIN roles r ON du.perfil = r.id
                        WHERE ec.id_entrenador = ?`;

    const [rows] = await conexion.query(sql, [id]);
    return rows;

}