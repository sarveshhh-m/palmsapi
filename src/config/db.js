import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "LYklE5lEiziXo",
  database: "palmstownhall",
  // port: "3306",
});

export default db;
