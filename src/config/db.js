import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost', // your database host
    user: 'root',      // your database user
    password: 'password', // your database password
    database: 'your_database_name' // your database name
};

const db = mysql.createPool(dbConfig); // Create a pool of connections

export default db;
