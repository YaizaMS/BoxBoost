import conexion from '../conexion';
import { format } from 'date-fns';

export async function getEjercicios() {
  const sql = `SELECT * from ejercicios;`;

  const [rows] = await conexion.query(sql);
  return rows;

};

export async function getInfoCliente(idEntrenador: number, idCliente: number) {
  const sql = `SELECT 
                  du.id,
                  du.nombre,
                  du.apellidos,
                  du.edad,
                  c.objetivo,
                  c.nivel_fitness,
                  c.disponibilidad,
                  c.frecuencia,
                  c.observaciones,
                  c.genero,
                  c.material
                FROM entrenadorClientes ec
                JOIN datosUser du ON ec.id_cliente = du.id
                LEFT JOIN usuarios u ON u.id_datosUser = du.id
                LEFT JOIN roles r ON du.perfil = r.id
                LEFT JOIN cuestionarios c ON c.user_id = du.id
                WHERE ec.id_entrenador = ? AND du.id = ?
                GROUP BY du.id
                ORDER BY du.id`;

  const [rows] = await conexion.query(sql, [idEntrenador, idCliente]);
  return rows;

};

export async function getClientes2(idEntrenador: number) {
  const sql = `SELECT du.id, du.nombre, du.apellidos
                FROM entrenadorClientes ec
                JOIN datosUser du ON ec.id_cliente = du.id
                WHERE ec.id_entrenador = ?
                GROUP BY du.id
                ORDER BY du.id`;
  const [rows] = await conexion.query(sql, [idEntrenador]);
  return rows;

};


export async function getEjerciciosCliente(idUser: number, fecha: Date) {
  const sql = `SELECT UE.id, UE.user_id, E.nombre, UE.fecha, UE.series, UE.repeticiones,  UE.peso, UE.tiempo, UE.notas
                FROM userEjercicios UE 
                LEFT JOIN ejercicios E ON E.id = UE.ejercicio_id WHERE UE.user_id = ? AND UE.fecha = ?;`;

  const fechaFormateada = format(fecha, 'yyyy-MM-dd');

  const [rows] = await conexion.query(sql, [idUser, fechaFormateada]);
  return rows;

};

export async function guardarEjercicio(user_id: number, fecha: Date, 
  ejercicio: { ejercicio_id: number, series: number, repeticiones: number, peso: number, tiempo?: number, notas?: string }) {
  const sql = `INSERT INTO userEjercicios (user_id, ejercicio_id, fecha, series, repeticiones, peso, tiempo, notas)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const fechaFormateada = format(fecha, 'yyyy-MM-dd');
  await conexion.query(sql,
    [user_id, ejercicio.ejercicio_id, fechaFormateada, ejercicio.series, 
      ejercicio.repeticiones, ejercicio.peso, ejercicio.tiempo ?? null, ejercicio.notas ?? null] );
}

export async function eliminarEjercicio(id: number) {
  const sql = `DELETE FROM userEjercicios WHERE id = ?`;
  await conexion.query(sql, [id]);
}

