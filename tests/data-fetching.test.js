const request = require('supertest');
require('dotenv').config();


const baseUrl = 'https://ambulance-tracker.herokuapp.com';

beforeAll( async ()=>{
    await process.nextTick(() => {})
    global.agent = request(baseUrl);
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