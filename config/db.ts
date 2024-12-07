import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  connectionLimit:10,
  host:'localhost',
  user:'root',
  password:'',
  database:'minisuper'
})

export default pool
