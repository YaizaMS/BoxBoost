import conexion from '../../conexion';

export async function getUsuario(id: string) {
    const conn = await conexion.getConnection();
    try {
        const [rows]: any = await conn.execute(
            `select * from datosUser where id = ?;`,
            [id]
        );
        const usu = rows[0];
        if(!usu) throw new Error('Usuario no encontrado');
        return usu;
    } catch (error) {
        
    }
}