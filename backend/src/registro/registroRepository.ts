import conexion from '../conexion';

export function registro(registro : {nombre: string, apellidos: string, email: string, edad: Date} ) {
    const sql = `INSERT INTO DatosUser (nombre, apellidos, edad, email) 
                VALUES (?,?,?,?)`;
    return conexion.query(sql, [registro.nombre, registro.apellidos, registro.edad, registro.email]);
}