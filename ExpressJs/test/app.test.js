const request = require('supertest');
const {expect} = require('chai');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index'); 
const Course = require("../schemas/courseSchema");
const User = require("../schemas/userSchema");
let mongoServer;

describe.skip('Course API (MongoDB)', () => {
     
    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
      });
    
    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
      });

    beforeEach(async () => {
        await Course.deleteMany({});
      });


    describe('POST /course', () => {
        
        it('should create a new course', async () => {
            const newCourse = new Course({
                    "courseName":"test course",
                    "courseId":"C1010",
                    "courseDuration":10,
                    "courseFee":"INR 1000"
            });
            const res = await request(app).post('/course').send(newCourse);
            console.log(res);
            expect(res.status).to.equal(201);
            expect(res.body).to.include(newCourse);
            expect(res.body).to.have.property('_id');
            // expect(res.body).to.have.property('name', userPayload.name);
        });

        // it('should return 400 if name or email is missing', async () => {
        //     const userPayload = {
        //         name:'John Doe'
        //     };
        //     const res = await request(app).post('/users').send(userPayload);
        //     // console.log(res);
        //     expect(res.status).to.equal(400);
        //     // expect(res.body).to.include(error);
        //     expect(res.body).to.have.property('error','Name and email are required.');
        //     // expect(res.body).to.have.property('name', userPayload.name);
        // });

        // it('should return 409 if Email already exists', async () => {
        //     const userPayload = {
        //         name:'John Doe',
        //         email:'john@gmail'
        //     };
        //     const res1 = await request(app).post('/users').send(userPayload);

        //     const res = await request(app).post('/users').send(userPayload);

        //     // console.log(res);
        //     expect(res.status).to.equal(409);
        //     expect(res.body).to.have.property('error','Email already exists.');
        //     // expect(res.body).to.include(userPayload);
        //     // expect(res.body).to.have.property('_id');
        //     // expect(res.body).to.have.property('name', userPayload.name);
        // });
    });

});

describe('Users API (MongoDB)', () => {
     
    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
      });
    
    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
      });

    beforeEach(async () => {
        await User.deleteMany({});
      });


    describe('POST /users', () => {
        
      it('should signup user', async () => {
            const newUser ={
                    "email":"demo1@test.com",
                    "password":"12345678"
                  };
            
            const res = await request(app).post('/users/signup').send(newUser);
            expect(res.status).to.equal(201);
      });

      it('should login a user', async () => {
          const newUser = {
                  "email":"demo5@test.com",
                  "password":"12345678"
                };

          const user = await request(app).post('/users/signup').send(newUser);
          const res = await request(app).post('/users/login').send(newUser);
          //console.log(res.body)
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('token');
      });

    });

});