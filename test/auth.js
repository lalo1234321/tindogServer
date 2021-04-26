const request = require('supertest');
const express = require('express');
const {expect} = require('chai');
const app = require('../dist/index');
const {describe, it} = require('mocha');

describe('Register test', () => {
    it('should return a status 200', (done) => { 
        request(app)    
            .post('/register')
            .send({
                "firstName": "Edgar",
                "lastName": "Mirafuentes",
                "userName": "test2",
                "email": "test2@test.com",
                "password": "password2",
                "age": 27,
                "state": "Méx",
                "town": "Metepec"
                
            })
            .expect(200)
            .end((err, res) => {
                    (err) ? done(err) : done();
            });
    });

    // it('should return a status 400 if one field is empty', (done) => { 
    //     request(app)    
    //         .post('/register')
    //         .send({
    //             "firstName": "Edgar",
    //             "lastName": "Mirafuentes",
    //             "userName": "test2",
    //             "email": "test2@test.com",
    //             "password": "password2",
    //             "age": 27,
    //             "state": "Méx",
    //             "town": ""
                
    //         })
    //         .expect(400)
    //         .end((err, res) => {
    //                 (err) ? done(err) : done();
    //         });
    // });
});

