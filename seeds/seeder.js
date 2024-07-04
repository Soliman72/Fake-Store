const db = require('../config/db');

// // Seed Categories
// for (let i = 0; i < 10; i++) {
//   const name = "frist category"
//   db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
//     if (err) throw err;
//   });
// }

// // Seed Products
// db.query('SELECT id FROM categories', (err, results) => {
//   if (err) throw err;
//   const categories = results.map(category => category.id);

//   for (let i = 0; i < 100; i++) {
//     const name = "first product";
//     const description = "new description for first product";
//     const price = 4000;
//     const category_id = 36;

//     db.query('INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)', [name, description, price, category_id], (err, results) => {
//       if (err) throw err;
//     });
//   }
// });







async function seedCategories() {
  // Insert categories
  for ( let i = 0; i < 10; i++ ){
    db.query( 'INSERT INTO categories (name) VALUES (?)', [ "categoryName" ], ( err ) =>{
      if ( err ) throw err;
      console.log( 'Categories seeded successfully' );
    } );
  }
}

async function seedProducts() {
    // Insert products
  for ( let i = 0; i < 100; i++ ){
    db.query( "SET FOREIGN_KEY_CHECKS=0" );
    db.query( `
    INSERT INTO products( title, description, price, category_id ) VALUES(?, ?, ? , ?)`,
      [ "product title", "product description", 4000, 39 ], ( err ) =>{
        if ( err ) throw err;
        console.log( 'Products seeded successfully' );
      } );
  }
}

async function runSeed() {
  try {
    seedCategories();
    seedProducts();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error running seed:', error);
  }
}
runSeed();