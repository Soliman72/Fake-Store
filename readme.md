# FakeStore API

## Overview
This project implements a RESTful API for a fake store using Node.js, Express, and MySQL. It includes CRUD operations for categories and products, user authentication using Passport.js, and comprehensive documentation.

## Features
- CRUD operations for categories and products
- User authentication with Passport.js
- Unit tests for functions
- Database migrations and seeding

## Project Structure

```bash
fakestore-api/
├── config/
│   ├── auth.js
│   ├── db.js
│   └── passport.js
├── controllers/
│   ├── categoriesController.js
│   └── productsController.js
├── migrations/
│   └── initial.js
├── models/
│   ├── category.js
│   └── product.js
├── routes/
│   ├── categories.js
│   ├── products.js
│   └── users.js
├── seeds/
│   └── seeder.js
├── test/
│   ├── categories.test.js
│   └── products.test.js
├── .gitignore
├── package.json
├── readme.md
└── index.js 

```

## Endpoints
  ### Categories

`GET /categories `

    Retrieve all categories

    
`POST /categories`

    Create a new category (authenticated)

`PUT /categories/:id`

    Update a category (authenticated)

`DELETE /categories/`

    Delete a category (authenticated)

  ### Products

`GET /products`

    Retrieve all products

`POST /products`

    Create a new product (authenticated)
    
`PUT /products/:id` 

    Update a product (authenticated)

`DELETE /products/:id`

    Delete a product (authenticated)

### Authentication
- Use Passport.js for user authentication.
  Only authenticated users can create, edit, or delete categories and products.

## Install

    npm install

## Setup the database 

    node migrations/initial.js

## seed the database 

    node seeds/seeder.js

## Start the server

    npm start

## testing 
  run unit test 

    npm test 