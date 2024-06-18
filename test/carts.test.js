import {expect} from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';

import config from '../src/config.js';
const port = config.port;

const requester = supertest(`http://localhost:${port}`);

mongoose.connect(`mongodb+srv://${config.mongodb_user}:${config.mongodb_password}@${config.mongodb_cluster}/${config.mongodb_dbname}?retryWrites=true&w=majority`);

describe("Testing ecommerce app", () => {

    describe("Testing carts api", () => {

        let cookie;
        let idCart;
        let idProduct = "65c59ab5799a18639f334f04";
        const userMock = {
            firstName: "Dario",
            lastName: "Alvarez",
            email: "dario@gmail.com",
            age: 25,
            password: "abc123",
        };

        it("Crear nuevo usuario: /api/register debe crear un nuevo usuario", async () => {

            //Given
            

            //Then
            const {statusCode, _body} = await requester.post("/api/register").send(userMock);
            // console.log(result);

            //Assert
            expect(statusCode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('_id');

            idCart = _body.cart
        });

        it("Loguear un usuario: /api/login debe devolver informacion del usuario logueado", async () => {

            //Given
            const mockLogin = {
                email: userMock.email,
                password: userMock.password
            }

            //Then
            const result = await requester.post("/api/login").send(mockLogin)
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
        });

        it("Agregar un producto al carrito: /carts/:cid/product/:pid debe agregar un producto", async () => {

            //Given
            const quantityMock = {
                quantity: 1
            }

            //Then
            const {statusCode, _body} = await requester.post(`/api/carts/${idCart}/product/${idProduct}`)
                .send(quantityMock)
                .set('cookie', `${cookie.name}=${cookie.value}`);

            
            //Assert
            expect(statusCode).is.eqls(200);
            expect(_body.products).to.be.an('array');
        });

        it("Traer el carrito: /carts/:cid muestra lo que hay en el carrito", async () => {

            //Given

            //Then
            const {statusCode, _body} = await requester.get(`/api/carts/${idCart}`);
            // console.log(_body);

            //Assert
            expect(statusCode).is.equal(200);
            expect(_body.products[0].product._id).is.equal(idProduct)
        });

    })

})