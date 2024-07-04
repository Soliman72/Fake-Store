const request = require( "supertest" );
const app = require( '../index' );


async function loginUser() {
  const res = await request(app).post('/users/login').send({
    email: 'solo2@solo.so',
    password: 'solo1234',
  });
  expect(res.statusCode).toEqual(200);
  return res.get('Set-Cookie');
}


// Function to test CRUD operations for categories or products
const testResource = (resourceType) => {
  let resourceId;

  describe(`${resourceType.toUpperCase()} API`, () => {
    // Create a resource
    it('should create a new resource', async () => {
      const cookie = await loginUser(); 

      // Create request body based on resource type
      const requestBody = resourceType === 'categories' ? { name: 'test category' } : {
        title : "third product for category 3" , 
        description : "description of second product ", 
        price : 200 ,
        category_id : 3
      };

      const response = await request(app) .post(`/${resourceType}`)
        .send(requestBody)
        .set('Cookie', cookie);

      expect(response.statusCode).toEqual(201);
      expect(response.body.data).toHaveProperty('id');
      resourceId = response.body.data.id;
    } );
    
    // Get all resources
    it('should fetch all resources', async () => {
      const response = await request(app).get(`/${resourceType}`);
      expect(response.statusCode).toEqual(200);
      expect(response.body.data).toBeInstanceOf(Array);
    } );

    // Fetch a single resource by ID
    it('should fetch a resource by ID', async () => {
      const response = await request(app).get(`/${resourceType}/${resourceId}`);
      expect(response.statusCode).toEqual(200);
    } );
    

    // Update a resource
    it('should update a resource', async () => {
      //     // login user for test auth routes
      const cookie = await loginUser();

      const updatedName = resourceType === 'categories' ? 'Updated Category' : 'Updated Product Name';
      const updateRequestBody = resourceType === 'categories' ? { name: updatedName } : {
        title : updatedName , 
        description : "description of second product ", 
        price : 200 ,
        category_id : 3
      };

      const response = await request(app)
        .put(`/${resourceType}/${resourceId}`)
        .send(updateRequestBody)
        .set('Cookie', cookie);

      expect(response.statusCode).toEqual(200);
      expect( response.body ).toHaveProperty( 'message',
        `${ resourceType == 'categories' ? 'Category' : 'Product'} updated successfully!` );
    } );

    // Delete a resource
    it('should delete a resource', async () => {
     // login user for test auth routes
      const cookie = await loginUser();

      const response = await request(app)
        .delete(`/${resourceType}/${resourceId}`)
        .set('Cookie', cookie);

      expect(response.statusCode).toEqual(200);
      expect( response.body ).toHaveProperty( 'message',
        `${ resourceType == 'categories' ? 'Category' : 'Product'} deleted successfully!` );
    } );
  });
};

testResource( 'categories' );
testResource( 'products' );
