import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "palmstownhall",
});

export default db;
