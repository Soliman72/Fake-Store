const db = require( "./../config/db" );
const sendResponse = require( "../utils/responseHelper" );

exports.createCategory = ( req, res ) =>
{
  const { name } = req.body;
  if ( !name ){
    return sendResponse(res , 401 , "fail" , "write the name of the category !")
  }

  const query = `insert into categories (name) 
                  values(?)`;
  
  db.query( query, [ name ], ( err, rows ) =>{
    if ( err ) return sendResponse( res, 401, "fail", " something went wrong !" );
  } );

  db.query( "select * from categories where name = ?", [ name ], (err , rows ) =>{
    sendResponse( res, 201, "success", null, rows[ 0 ] );
  })
};

exports.getAllCategories = ( req, res ) =>{
  const query = 'select * from categories';
  db.query( query, ( err, result ) =>{
    if ( err ) return sendResponse( res, 404, "fail", " something went wrong !" );
    sendResponse( res, 200, "success", null, result );
  })
};

exports.getCategoryById = (req, res) => {
  const { id } = req.params;
  try {
    db.query( 'SELECT * FROM categories WHERE id = ?', [ id ] , (err , rows)=>{
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(rows[0]);
    } );
  } catch (err) {
    res.status(500).json({ error: 'Error fetching category' });
  }
};

exports.updateCategory = ( req, res ) =>{
  const {id} = req.params;
  const { name } = req.body;
  if ( !name || !id ){
    return sendResponse( res, 400, "fail", "Please provide both the id and name of the category!" );
  }

  const query = "update categories set name = ? where id= ? ";
  db.query( query, [ name, id ], ( err, result ) =>{
    if ( err ) return sendResponse( res, 404, "fail", " something went wrong !" );
    
    // if there is a category with that id or not 
    if ( result.affectedRows === 0 ){
      return sendResponse( res, 404, "fail", "Category not found!" );
    }

    // fetch the updated category and send it in the response
    const selectQuery = `SELECT * FROM categories WHERE id = ?`;
    db.query( selectQuery, [ id ], ( err, rows ) =>{
      if ( err ) return sendResponse( res, 404, "fail", " something went wrong !" );
      sendResponse( res, 200, "success", "Category updated successfully!", rows[ 0 ] );
    } );
  } );
};


exports.deleteCategory = ( req, res ) =>{
  const { id } = req.params;
  if ( !id ){
    return sendResponse( res, 400, "fail", "Please provide the id of the category!" );
  }

  // check the id is exist or not 
  const selectQuery = `SELECT * FROM categories WHERE id = ?`;
  db.query( selectQuery, [ id ], ( err , rows) =>{
    if ( rows[ 0 ] == null )
      sendResponse( res, 404, "fail", "the id of category is not exist !" );
  })

  const query = "delete from categories where id = ?";
  db.query( query, [ id ], ( err ) =>{
    if ( err ){
      sendResponse( res, 404, "fail", " something went wrong !" );
      return;
    }
    sendResponse( res, 200, "success", "Category deleted successfully!" );
  })
}