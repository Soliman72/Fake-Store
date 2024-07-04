const express = require( "express" );
const { createProduct, updateProduct , deleteProduct, getAllproducts, getProductByID }
  = require( "../controller/productController" );

const { ensureAuthenticated} = require( "../config/auth" );

const router = express.Router();

router.post( "/",ensureAuthenticated, createProduct );
router.get( "/", getAllproducts );
router.get( "/:id", getProductByID );
router.put( "/:id",ensureAuthenticated, updateProduct );
router.delete( "/:id",ensureAuthenticated, deleteProduct );

module.exports = router;