const express = require( "express" );
const { createCategory, getAllCategories, updateCategory, deleteCategory, getCategoryById }
  = require( "../controller/categoryController" );

const { ensureAuthenticated} = require( "../config/auth" );

const router = express.Router();


router.post( "/",ensureAuthenticated , createCategory );
router.get( "/", getAllCategories );
router.get( "/:id", getCategoryById );
router.put( "/:id",ensureAuthenticated , updateCategory );
router.delete( "/:id",ensureAuthenticated , deleteCategory );

module.exports = router;