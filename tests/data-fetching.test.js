const db = require('../models/db');
//const User = require('../models/user');
const router = require('../routes/user');
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
Admin = mongoose.mongo.Admin;
require('dotenv').config();

//jest.mock('node-fetch', ()=>jest.fn())
const app = new express();
app.use('/', router);

//let server;

const baseUrl = 'https://ambulance-tracker.herokuapp.com';

beforeAll( async ()=>{
    await process.nextTick(() => {})
    db.connect();
    global.agent = request(baseUrl);
});

afterAll(async ()=> {
    await db.closeConnection();
});


describe('Check if the required data is available', ()=>{
    
    test('check if data is fetched', async () => {
      
        const res = await global.agent.get('/hospitals');
        expect(res.body.status).toBe('OK');

      });

      test('check if the data contains hospitals', async () => {
      
        const res = await global.agent.get('/hospitals');
        res.body.results.forEach((result) => {
            expect(JSON.stringify(result.types)).toContain('hospital');
        });

      });

      test('check if the data contains hospitals located in Alexandria', async () => {
      
        const res = await global.agent.get('/hospitals');
        
        expect(JSON.stringify(res.body.results)).toContain('Alexandria');

      });


});