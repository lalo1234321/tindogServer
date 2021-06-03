const { describe, it } = require('mocha');
const requestSuperTest = require('supertest');
const app = require("../../dist/index"); 
const petRoutes = require('../../dist/routes/petRoutes');
const path = require('path');
const chai = require('chai');

describe('POST /pet', () => {
    const request = requestSuperTest(app);
    it('Respond with a 200 code if all fields are filled', (done) => {
        request.post('/pet') 
            .field('username', 'capuchino21')
            .field('name', 'capuchino')
            .field('age', 12)
            .field('specie', 'perro')
            .field('breed', 'french poodle')
            .field('vaccines','covid-19')
            .field('owner', '60791f8afd3aa23fb3716229') 
            .attach('profileImage', path.join(__dirname, '../../testAssets/profileImage.jpeg'))
            .attach('medicalCertificateImage', path.join(__dirname, '../../testAssets/certificado.jpg'))
            .expect(200) 
            .expect({ 
                "message": "Pet registered",
                "petInfo": { 
                    "username": "capuchino21",
                    "name": "capuchino",
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
    
    it('Respond with a (404 code & Custom message) if all fields are empty', (done) => {
        request.post('/pet') 
            .field('username', '')
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
                "message": "Invalid value for USERNAME",
            }) 
            .then(response => { 
                done();
            })
            .catch(err => { 
                done(err);
            })
            
    });

    it('Respond with a (404 code & Custom message) if only the first field is filled', (done) => {
        request.post('/pet') 
            .field('username', 'Capuchino21')
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
    it('Respond with a (404 code & Custom message) if only the first 2 fields are filled', (done) => {
        request.post('/pet') 
            .field('username', 'Capuchino21')
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
    it('Respond with a (404 code & Custom message) if only the even fields are filled', (done) => {
        request.post('/pet') 
            .field('username', 'Capuchino21')
            .field('name', '')
            .field('age', 6)
            .field('specie', '')
            .field('breed', 'CHIHUAHA')
            .field('vaccines','')
            .field('owner', '321312412') 
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
    it('Respond with 400 if extension of first attached file is wrong', () => { 
        request.post('/pet') 
            .accept('application/json')
            .field('username', 'fer32')
            .field('name', 'fernando')
            .field('age', 12)
            .field('specie', 'perro')
            .field('breed', 'french poodle')
            .field('vaccines','covid-19')
            .field('owner', '60791f8afd3aa23fb3716229') 
            .attach('profileImage', path.join(__dirname, '../../testAssets/ManualDeUsuario.pdf'))
            .attach('medicalCertificateImage', path.join(__dirname, '../../testAssets/certificado.jpg'))
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
            .field('username', 'fer32')
            .field('name', 'fernando')
            .field('age', 12)
            .field('specie', 'perro')
            .field('breed', 'french poodle')
            .field('vaccines','covid-19')
            .field('owner', '60791f8afd3aa23fb3716229') 
            .attach('profileImage', path.join(__dirname, '../../testAssets/profileImage.jpeg'))
            .attach('medicalCertificateImage', path.join(__dirname, '../../testAssets/plain_text.txt'))
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
    
    it.only('Returns true if the File is valid', (done) => {
        const testFile = [
                {
                    originalname: "medicalCertificateImage.jpg",
                    mimetype: "image/jpg"
                }
        ]

        petRoutes.isValidFile(testFile);
        done();
        
    });

})