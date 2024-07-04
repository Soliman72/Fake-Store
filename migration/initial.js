const db = require( "../config/db" );

const createTables = `
  
  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  );

  CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );

  CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    image varchar(255),
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

`

db.query( createTables, (err) =>{
  if ( err ) throw err;
  console.log( 'Tables Created Success...' );
})