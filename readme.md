# FakeStore API

## Overview
This project implements a RESTful API for a fake store using Node.js, Express, and MySQL. It includes CRUD operations for categories and products, user authentication using Passport.js, and comprehensive documentation.

## Features
- CRUD operations for categories and products
- User authentication with Passport.js
- Unit tests for functions
- Database migrations and seeding

## Project Structure

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
