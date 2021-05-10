const {expect} = require('chai');
const sinon = require('sinon');
const { stub } = require('sinon');
const requestSuperTest = require('supertest');
const app = require('../../dist/index');
const {describe, it} = require('mocha');
const {userController} = require('../../dist/routes/userRoutes');
const { request, response } = require('express');

describe('Register test', (  ) => {
    

    //it('should return a status 200', (done) => { 
    //    const stubbing = sinon.stub(userController, 'register').callsArgWith(2,request, response);
    //    console.log(stubbing);
    //    requestSuperTest(app)    
    //        .post('/register')
    //        .send({
    //            "firstName": "Edgar",
    //            "lastName": "Mirafuentes",
    //            "userName": "lalo1234321",
    //            "email": "lalo24@test.com",
    //            "password": "password1234",
    //            "age": 27,
    //            "state": "Méx",
    //            "town": "Metepec"               
    //        })
    //        .expect(200)
    //        .then( response => {

    //        expect(stubbing.calledOnce).to.be.true;
    //        done();
    //        })
    //        .catch( onRejected => {
    //            console.log('Error', onRejected);
    //            done(onRejected);
    //        });

    //});

    
});

