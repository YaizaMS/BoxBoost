import conexion from '../../conexion';

export async function getUsuario(id: number) {
    const sql = `select * from datosUser where id = ?;`;

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