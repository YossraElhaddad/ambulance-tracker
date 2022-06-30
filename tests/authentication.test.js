const db = require('../models/db');
const request = require('supertest');

const baseUrl = 'https://ambulance-application.herokuapp.com';

beforeAll( async ()=>{
    await process.nextTick(() => {})
    db.connect();
    global.agent = request(baseUrl);
});

afterAll(async ()=> {
    await db.closeConnection();
});


describe('Testing user authentication', ()=>{

    it('check if a user register with incorrect confirm password', async ()=>{
   
       const mockData = {
        "name": "Lara",
        "email": "lara99@gmail.com",
        "id": 30001061201212,
        "dateOfBirth": "1999-05-01",
        "password": "lara12355",
        "confirmPassword": "lara12345"
       }
       const res = await global.agent.post('/registration').send(mockData);
       expect(res._body.success).toBeFalsy();
       expect(res._body.message).toEqual('Password and Confirm password do not match');
  
    });
    it('check if a user can register and has its password hashed', async ()=>{
   
        const mockData = {
         "name": "Lara",
         "email": "lara99@gmail.com",
         "id": 30001061201212,
         "dateOfBirth": "1999-05-01",
         "password": "lara12345",
         "confirmPassword": "lara12345"
        }
        const res = await global.agent.post('/registration').send(mockData);
        console.log(res)
        expect(res._body.password).not.toEqual(mockData.password);
     });

    it('check if a registered user can login', async ()=>{
   
        const existedUser = {
            "email": "ahmed@gmail.com",
            "password": "ahmed1234"
        }
           
       const res = await global.agent.post('/login').send(existedUser);
       expect(res._body.success).toBeTruthy();
       expect(res._body.user).toBeDefined();
   
     });

     it('check if an unregistered user tries to login', async ()=>{
   
        const nonExistingUser = {
            "email": "ahmed2004@gmail.com",
            "password": "ahmed1234"
        }
           
       const res = await global.agent.post('/login').send(nonExistingUser);
       expect(res._body.success).toBeFalsy();
       expect(res._body.message).toEqual('No user found');
   
     });


});