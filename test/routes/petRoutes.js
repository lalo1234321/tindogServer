const { describe, it } = require('mocha');
const requestSuperTest = require('supertest');
const app = require("../../dist/index");
const FormData = require('form-data');
const { response } = require('express');
const fs = require('fs');
const path = require('path');

describe('POST /pet', () => {
    const request = requestSuperTest(app);
    it('Respond with a 200 code if all fields are filled', (done) => {
        request.post('/pet') 
            .field('name', 'fernando')
            .field('age', 12)
            .field('specie', 'perro')
            .field('breed', 'french poodle')
            .field('vaccines','covid-19')
            .field('owner', '60791f8afd3aa23fb3716229') 
            .attach('profileImage', path.join(__dirname, '../../assets/profileImage.jpeg'))
            .attach('medicalCertificateImage', path.join(__dirname, '../../assets/certificado.jpg'))
            .expect(200) 
            .expect({ 
                "message": "Pet registered",
                "petInfo": { 
                    "name": "fernando",
                    "age": "12",
                    "specie": "perro",
                    "breed": "french poodle",
                    "vaccines":"covid-19",
                    "owner":"60791f8afd3aa23fb3716229"
                }
            }) 
            .then(response => { 
                done();
            })
            .catch(err => { 
                done(err);
            })
            
    });

    it('Respond with 400 if extension of first attached file is wrong', () => { 
        request.post('/pet') 
            .accept('application/json')
            .field('name', 'fernando')
            .field('age', 12)
            .field('specie', 'perro')
            .field('breed', 'french poodle')
            .field('vaccines','covid-19')
            .field('owner', '60791f8afd3aa23fb3716229') 
            .attach('profileImage', path.join(__dirname, '../../assets/ManualDeUsuario.pdf'))
            .attach('medicalCertificateImage', path.join(__dirname, '../../assets/certificado.jpg'))
            .expect(400) 
            .expect({
                message: "Invalid extension, you should use JPG, JPEG or PNG"
            })
            .then(response => { 
                done();
            })
            .catch(err => { 
                done(err);
            })
    })

    it('Respond with 400 if extension of second attached file is wrong', () => { 
        request.post('/pet') 
            .accept('application/json')
            .field('name', 'fernando')
            .field('age', 12)
            .field('specie', 'perro')
            .field('breed', 'french poodle')
            .field('vaccines','covid-19')
            .field('owner', '60791f8afd3aa23fb3716229') 
            .attach('profileImage', path.join(__dirname, '../../assets/profileImage.jpeg'))
            .attach('medicalCertificateImage', path.join(__dirname, '../../assets/plain_text.txt'))
            .expect(400) 
            .expect({
                message: "Invalid extension, you should use JPG, JPEG or PNG"
            })
            .then(response => { 
                done();
            })
            .catch(err => { 
                done(err);
            })
    })
})