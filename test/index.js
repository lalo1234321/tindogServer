const request = require('supertest');
const express = require('express');
const {expect} = require('chai');
const app = require('../dist/index');
const {describe, it} = require('mocha');


describe('Main test', () => {
    it('should return a string', () => { 
        request(app)
            .get('/')
            .end(function(err, res) {
                    // console.log('res: ', res);
                    expect(res.text).equal("Hello World");

            })
    })
})
