import {expect} from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';

import config from '../src/config.js';
const port = config.port;

const requester = supertest(`http://localhost:${port}`);

mongoose.connect(`mongodb+srv://${config.mongodb_user}:${config.mongodb_password}@${config.mongodb_cluster}/${config.mongodb_dbname}?retryWrites=true&w=majority`);

describe("testing ecommerce app", () => {

    describe("Testing user api", () => {

        
        let cookie;
        const userMock = {
            firstName: "Rodolfo",
            lastName: "Diaz",
            email: "rofo@gmail.com",
            age: 25,
            password: "abc123"
        };
        
        it("Crear nuevo usuario: /api/register debe crear un nuevo usuario", async () => {

            //Given
            

            //Then
            const {statusCode, _body} = await requester.post("/api/register").send(userMock);
            // console.log(result);

            //Assert
            expect(statusCode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('_id');
        })

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

        it("Test ruta current: Debo enviar los datos de usuario logueado", async () => {

            //Given

            //Then
            const {_body} = await requester.get("/api/current").set('cookie', [`${cookie.name}=${cookie.value}`])
            // console.log(_body);

            //Assert
            expect(_body.email).to.be.ok.and.eql(userMock.email);

        })

    })

})