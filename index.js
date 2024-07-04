const express = require( "express" );
const bodyParser = require( 'body-parser' );
require( "./config/db" );
const session = require( "express-session" );
const passport = require( "passport" );

const app = express();
module.exports = app;

app.use( bodyParser.json() );

app.use( session( {
  secret: 'my_secret_key_isSECRETKEY%%$#solo',
  resave: false,
  saveUninitialized: false
} ) );
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


const categoryRoute = require( "./routes/categoryRoute" );
const productRoute = require( "./routes/productRoute" );
const userRoute = require( "./routes/userRoute" );

app.use( "/categories", categoryRoute );
app.use( "/products", productRoute );
app.use( "/users", userRoute );



const port = 3000;
app.listen( port,
  () => console.log( `server running on port ${ port }...` ) );