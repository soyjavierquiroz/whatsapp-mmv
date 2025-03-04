// Funciones.ts
import mysql from 'mysql';

// Función para obtener la conexión a la base de datos
const getConnection = () => {
  // Configurar la conexión a la base de datos
  // const connection = mysql.createConnection({
  //   host: process.env.DB_HOST || 'localhost',
  //   user: process.env.DB_USER || 'root',
  //   password: process.env.DB_PASSWORD || '',
  //   database: process.env.DB_DATABASE || 'MMW'
  // });

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Enbo',
    database: 'mmw'
  });
  return connection;
};

export default getConnection