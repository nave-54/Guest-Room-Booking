// const mysql=require('mysql');
const mysql=require('mysql');
const conn = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"root123",
    database:'cartrabbit',
})

conn.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database img');
  }); 

  module.exports=conn;