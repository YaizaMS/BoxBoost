import conexion from '../../conexion';

export async function getUsuarioEntrenador(id: number) {
    const sql = `select * 
                from datosUser DU
                LEFT JOIN codigos C ON C.id_entrenador = DU.id
                where DU.id = ?;`;

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
    const sql = ` SELECT du.*, u.user, r.nombre AS rol
                    FROM entrenadorClientes ec
                    JOIN datosUser du ON ec.id_cliente = du.id
                    JOIN usuarios u ON u.id_datosUser = du.id
                    JOIN roles r ON du.perfil = r.id
                    WHERE ec.id_entrenador = ?;`;

    const [rows] = await conexion.query(sql, [id]);
    return rows;

}

export async function eliminarCuenta(id: number) {
    const conn = await conexion.getConnection();

    try {
        await conn.beginTransaction();

        await conn.query('DELETE FROM usuarios WHERE id_datosUser = ?', [id]);
        await conn.query('DELETE FROM cuestionarios WHERE user_id = ?', [id]);
        await conn.query('DELETE FROM entrenadorClientes WHERE id_cliente = ?', [id]);
        await conn.query('DELETE FROM entrenadorClientes WHERE id_entrenador = ?', [id]);
        await conn.query('DELETE FROM codigos WHERE id_entrenador = ?', [id]); 

        await conn.query('DELETE FROM datosUser WHERE id = ?', [id]);

        await conn.commit();

    } catch (err) {
        await conn.rollback();
        throw err;

    } finally {
        conn.release();
    }
}



export async function eliminarEntrenadorYClientes(idEntrenador: number) {
    const conn = await conexion.getConnection();
    try {
        await conn.beginTransaction();

        const [clientes]: any = await conn.query(
            'SELECT id_cliente FROM entrenadorClientes WHERE id_entrenador = ?',
            [idEntrenador]
        );

        for (const cliente of clientes) {
            const idCliente = cliente.id_cliente;

            await conn.query('DELETE FROM usuarios WHERE id_datosUser = ?', [idCliente]);
            await conn.query('DELETE FROM cuestionarios WHERE user_id = ?', [idCliente]);
            await conn.query('DELETE FROM entrenadorClientes WHERE id_cliente = ?', [idCliente]);
            await conn.query('DELETE FROM entrenadorClientes WHERE id_entrenador = ?', [idCliente]);
            await conn.query('DELETE FROM datosUser WHERE id = ?', [idCliente]);
        }

        await conn.query('DELETE FROM entrenadorClientes WHERE id_entrenador = ?', [idEntrenador]);
        await conn.query('DELETE FROM usuarios WHERE id_datosUser = ?', [idEntrenador]);
        await conn.query('DELETE FROM cuestionarios WHERE user_id = ?', [idEntrenador]);
        await conn.query('DELETE FROM datosUser WHERE id = ?', [idEntrenador]);

        await conn.commit();
        return { success: true };
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}
