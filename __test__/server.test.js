'use strict';
const supertest = require('supertest')
const server = require('../src/server');
const base64= require('base-64')
const request = supertest(server.app);




describe('Basic Auth', () =>{
    it('sign up and create a new user correctly', async () => {

        
      const response = await request.post('/signup').send({ username: 'test7', password: 'test7' });
      expect(response.status).toEqual(201);
   
      expect(response.body.username).toEqual('test7')
    });
    it('POST signin', async () => {
        
        let response = await request.post('/signin').auth('test7', 'test7');;
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual('test7');
    });
});

    describe('test middleware', () => {
        it('Does the middleware function (send it a basic header)', async () => {
            let test= base64.encode('test7:test7');
            let response = await request.post('/signin').set(`Authorization`, `Basic ${test}`);
            expect(response.status).toEqual(200);
            expect(response.body).toBeTruthy();
        });
        it('routes assert the requirements (signup/signin)', async () => {
            const response = await request.post('/');
            expect(response.status).toBe(404);
        });


    it('should throw 403 on POST to /signin with bad info (uncorrect data)', async () => {
  
    const response = await request.post('/signin').auth('test7', 'false');;
    expect(response.status).toBe(403);
    expect(response.body.username).toBe(undefined);
  });

  it('should throw 403 on POST to /signup with repeated info (sign up with  existing user name)', async () => {
    const test = {
        username: 'test7',
        password: 'test7',
      };
    const response = await request.post('/signup').send(test);
    expect(response.status).toBe(403);
  });
  
});


describe('General TESTS:', () => {
   
    it('should respond with 404 on bad request', async () => {
      const response = await request.get('/foo');
      expect(response.status).toEqual(404);
   
    });

    it('response with 200 on a correct request', async () => {
        const response = await request.get('/');
        expect(response.status).toEqual(200);
      });
  
    it('should respond with 404 on bad method', async () => {
        const response = await request.put('/');
        expect(response.status).toEqual(404);
    
    });
    it('response with 500 on a bad route', async () => {
        const response = await request.get('/bad');
        expect(response.status).toEqual(500);
      });

    });