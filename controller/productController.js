const db = require( "./../config/db" );
const sendResponse = require( "../utils/responseHelper" );

exports.createProduct = ( req, res ) =>{
  const { title , description , price , category_id , image } = req.body;
  if ( !title || !description || !price || !category_id  ){
    return sendResponse( res, 401, "fail",
      "write the fields ( title , description , price , category_id ) to create Product !" )
  }

  // check the id of the category is exist or not 
  const selectQuery = `SELECT * FROM categories WHERE id = ?`;
  db.query( selectQuery, [ category_id ], ( err , rows) =>{
    if ( rows[ 0 ] == null )
      return sendResponse( res, 404, "fail", "the id of category is not exist !" );
  })

  const query = `insert into products (title , description , price , category_id) 
                  values(? , ? ,?,?)`;
  
  db.query( query, [ title , description , price , category_id ], 
    ( err, result ) =>{
      if ( err ) return sendResponse( res, 401, "fail", " something went wrong !" );
    } );
  
    db.query( "select * from products where title = ?", [ title ], (err , rows ) =>{
      sendResponse( res, 201, "success", null, rows[ 0 ] );
    })
};

exports.getAllproducts = ( req, res ) =>{
  const query = 'select * from products';
  db.query( query, ( err, result ) =>{
    if ( err ) return sendResponse( res, 404, "fail", " something went wrong !" );
    sendResponse( res, 200, "success", null, result );
  })
};

exports.getProductByID = (req, res) => {
  const { id } = req.params;
  try {
    db.query( 'SELECT * FROM products WHERE id = ?', [ id ] , (err , rows)=>{
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(rows[0]);
    } );
  } catch (err) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

exports.updateProduct = ( req, res ) =>{
  const {id} = req.params;
  const { title , description , price , category_id , image } = req.body;
  if (( !title || !description || !price || !category_id )|| !id ){
    return sendResponse( res, 400, "fail", "Please provides field that required of the Product!" );
  }

  const query = `update products set title = ? , description= ? 
  , price = ? , category_id = ?
  where id = ? `;

  db.query( query, [ title , description , price , category_id, id ], ( err, result ) =>{
    if ( err ) return sendResponse( res, 404, "fail", " something went wrong !" );
    
    // if there is a Product with that id or not 
    if ( result.affectedRows === 0 ){
      return sendResponse( res, 404, "fail", "Product not found!" );
    }

    // fetch the updated Product and send it in the response
    const selectQuery = `SELECT * FROM products WHERE id = ?`;
    db.query( selectQuery, [ id ], ( err, rows ) =>{
      if ( err ) return sendResponse( res, 404, "fail", " something went wrong !" );
      sendResponse( res, 200, "success", "Product updated successfully!", rows[ 0 ] );
    } );
  } );
};


exports.deleteProduct = ( req, res ) =>{
  const { id } = req.params;
  if ( !id ){
    return sendResponse( res, 400, "fail", "Please provide the id of the Product!" );
  }

  // check the id is exist or not 
  const selectQuery = `SELECT * FROM products WHERE id = ?`;
  db.query( selectQuery, [ id ], ( err , rows) =>{
    if ( rows[ 0 ] == null )
      return sendResponse( res, 404, "fail", "the id of Product is not exist !" );
  })

  const query = "delete from products where id = ?";
  db.query( query, [ id ], ( err ) =>{
    if ( err ) return sendResponse( res, 404, "fail", " something went wrong !" );
    sendResponse(res, 200, "success", "Product deleted successfully!");
  })
}