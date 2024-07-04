const db = require( '../config/db' );

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