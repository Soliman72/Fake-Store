const mysql = require( "mysql2" );

const connection = mysql.createConnection( {
  host: "localhost",
  user: "root",
  database: "fakestore",
  password: ""
} );

connection.connect( ( err ) =>{
  if ( err ) throw err;
  console.log( 'DB connected success...' );
} );

module.exports = connection;