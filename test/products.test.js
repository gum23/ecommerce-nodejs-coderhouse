import {expect} from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';

import config from '../src/config.js';
const port = config.port;

const requester = supertest(`http://localhost:${port}`);

mongoose.connect(`mongodb+srv://${config.mongodb_user}:${config.mongodb_password}@${config.mongodb_cluster}/${config.mongodb_dbname}?retryWrites=true&w=majority`);

describe('Testing ecommerce App', () => {

    describe("Testing products api", () => {

        let cookie;
        let idProduct;
    
        it("Logue usuario: Es necesario para poder crear un producto", async () => {
            //Given
            const mockLogin = {
                email: 'adminCoder@coder.com',
                password: 'adminCod3r123'
            }
            //Then
            const result = await requester.post('/api/login').send(mockLogin);
            // console.log(result);
            const cookieResult = result.header['set-cookie'][0];
            const cookieData = cookieResult.split('=')
            cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }

            //Assert
            expect(cookie.name).is.eqls('coderCookie');
            expect(cookie.value).is.ok;
        })

        it("Crea un producto: El api post /api/products debe crear un producto", async () => {
            //Given  -  Ejemplo mockeado
            const productsMock ={
                    "title": "Guitarra",
                    "description": "Les paul origen USA",
                    "code": "gtr008",
                    "price": 1250364,
                    "status": true,
                    "stock": 3,
                    "category": "cuerdas",
                    "thumbnails": ["https://http2.mlstatic.com/D_NQ_NP_742752-MLA48701763262_122021-O.webp"]
                }

            //Then
            const {statusCode, _body} = await requester
                .post('/api/products')
                .send(productsMock)
                .set('Accept', 'application/json')
                .set('cookie', [`${cookie.name}=${cookie.value}`]);
            
            // console.log(result);

            //Assert
            expect(statusCode).is.eqls(200);
            expect(_body.payload).is.ok.and.to.have.property('_id');
            expect(_body.payload.status).is.eqls(true);

            idProduct = _body.payload._id;
        });

        it("Trae productos: El api get /api/products debe trer una lista de productos", async () => {
            //Given  -  Ejemplo mockeado

            //Then
            const {statusCode, _body} = await requester.get('/api/products').set('cookie', [`${cookie.name}=${cookie.value}`]);
            // console.log(result);

            //Assert
            expect(statusCode).is.eqls(200);
            expect(_body.payload).to.be.an('array');
        });

        it("Trae un producto: El api get /api/products/:pid debe trer un producto", async () => {
            //Given  -  Ejemplo mockeado

            //Then
            const {statusCode, _body} = await requester.get(`/api/products/${idProduct}`);
            // console.log(result);

            //Assert
            expect(statusCode).is.eqls(200);
            expect(_body._id).is.equal(idProduct);
        });

    });


});