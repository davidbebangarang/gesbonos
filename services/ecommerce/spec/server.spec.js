const express = require('express');
const logger = require('morgan');
const http = require('http');
const PinsRouter = require('../src/routes');
const bono = require('../src/models/bono');
const request = require('request');
const app = express();

app.use(logger('dev'))
app.use(express.json())
app.use('/api', PinsRouter);
app.set('port', 2000);

describe('Testing Router', () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen(2000);
  })

  afterAll(() => {
    server.close();
  });

  describe('GET custom Bono', () => {
   
    //GET 200
    it ('200 and find Bono', done=>{
      const data =[{id:1}];
      spyOn(bono, 'find').and.callFake(callBack => {
        console.log('--------------------------------------------');
        console.log(typeof callBack);
        callBack(false, data);
      });
      }); 
        request.get('http://localhost:2000/api',(error,response,body)=>{
          expect(response.statusCode).toBe(200);
          console.log("iocnoainc");
          console.log(response.body);
          expect(JSON.parse(response.body)).toEqual([{id:1}]);
          done();
        })
    });

  })




