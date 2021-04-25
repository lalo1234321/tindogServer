const { describe, it } = require('mocha');
const requestSuperTest = require('supertest');
const app = require("../../dist/index"); 
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
    
    it.only('Respond with a (404 code & Custom message) if all fields are empty', (done) => {
        request.post('/pet') 
            .field('name', '')
            .field('age', '')
            .field('specie', '')
            .field('breed', '')
            .field('vaccines','')
            .field('owner', '') 
            .attach('profileImage', null)
            .attach('medicalCertificateImage', null)
            .expect(404) 
            .expect({ 
                "message": "Invalid value for NAME",
            }) 
            .then(response => { 
                done();
            })
            .catch(err => { 
                done(err);
            })
            
    });

    it.only('Respond with a (404 code & Custom message) if only the first field is filled', (done) => {
        request.post('/pet') 
            .field('name', 'Capuchino')
            .field('age', '')
            .field('specie', '')
            .field('breed', '')
            .field('vaccines','')
            .field('owner', '') 
            .attach('profileImage', null)
            .attach('medicalCertificateImage', null)
            .expect(404) 
            .expect({ 
                "message": "Invalid value for AGE",
            }) 
            .then(response => { 
                done();
            })
            .catch(err => { 
                done(err);
            })
            
    });
    it.only('Respond with a (404 code & Custom message) if only the first 2 fields are filled', (done) => {
        request.post('/pet') 
            .field('name', 'Capuchino')
            .field('age', 8)
            .field('specie', '')
            .field('breed', '')
            .field('vaccines','')
            .field('owner', '') 
            .attach('profileImage', null)
            .attach('medicalCertificateImage', null)
            .expect(404) 
            .expect({ 
                "message": "Invalid value for SPECIE",
            }) 
            .then(response => { 
                done();
            })
            .catch(err => { 
                done(err);
            })
            
    });
    it.only('Respond with a (404 code & Custom message) if only the even fields are filled', (done) => {
        request.post('/pet') 
            .field('name', 'Capuchino')
            .field('age', '')
            .field('specie', 'perro')
            .field('breed', '')
            .field('vaccines','covid-19')
            .field('owner', '') 
            .attach('profileImage', null)
            .attach('medicalCertificateImage', null)
            .expect(404) 
            .expect({ 
                "message": "Invalid value for AGE",
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