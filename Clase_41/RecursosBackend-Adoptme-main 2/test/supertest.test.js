import chai from "chai";
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest('http://localhost:8080')

// Contexto global
describe("Testing Adopme App", () => {


    /*=============================================
    =                   Section 01                =
    =============================================*/
    // Contexto local
    describe("Testing Pets Api", () => {

        // Test 01
        it("Crear Mascota: El API POST /api/pets debe crear una nueva mascota correctamente", async () => {
            // Given
            const petMock = {
                name: "Patiotas",
                specie: "Pez",
                birthDate: "10-10-2022"
            }


            // Then
            const { statusCode, ok, _body } = await requester.post('/api/pets').send(petMock)
            // console.log(result);


            // Assert
            expect(statusCode).is.eqls(200)
            expect(_body.payload).is.ok.and.to.have.property("_id")
            expect(_body.payload).to.have.property('adopted').and.to.be.deep.equal(false)

        })


        // Test 02
        it("Crear Mascota sin nombre: El API POST /api/pets debe retornar un estado HTTP 400 con error.", async () => {

            // Given
            const petMock = {
                specie: "Pez",
                birthDate: "10-10-2022"
            }


            // Then
            const { statusCode, _body } = await requester.post('/api/pets').send(petMock)


            // Assert
            expect(statusCode).is.eqls(400)
            expect(_body).is.ok.and.to.have.property('error')
            expect(_body).to.have.property('status');
        })


        // Test 03 - Multer
        it("Crear mascota con Avatar (Test con uploads): Debe poder crearse una mascota con la ruta de la imagen.", async () => {
            //Given:
            const petMock = {
                name: "Orejitas",
                specie: "cat",
                birthDate: "10-11-2022"
            };

            //Then:
            const result = await requester.post("/api/pets/withimage")
                .field('name', petMock.name)
                .field('specie', petMock.specie)
                .field('birthDate', petMock.birthDate)
                .attach('image', './test/files/coderDog.jpg');

            //Assert that:
            expect(result.statusCode).to.eql(200);
            // console.log(result._body);
            expect(result._body.payload.image).to.be.ok;
        });
    })




    /*=============================================
    =                   Section 02                =
    =============================================*/
    describe("Testing Login and session with Cookies", () => {

        // Before
        before(function () {
            this.cookie;
            this.mockUser = {
                first_name: "Usuario de prueba 1",
                last_name: "Apellido de prueba 1",
                email: "correodeprueba1@gmail.com",
                password: "123456"
            }
        })


        // Test 01 - registro user
        it("Test Registro Usuario: Debe poder registrar correctamente un usuario", async function () {

            // Given
            console.log(this.mockUser);


            // Then
            const { statusCode, _body } = await requester.post('/api/sessions/register').send(this.mockUser);


            // Assert
            expect(statusCode).is.eqls(200)
        })



        // Test 02 - Login user
        it("Test Login Usuario: Debe poder hacer login correctamente con el usuario registrado previamente.", async function () {


            // Given
            const mockLogin = {
                email: this.mockUser.email,
                password: this.mockUser.password,
            }

            // Then
            const result = await requester.post('/api/sessions/login').send(mockLogin);
            // console.log(result); // result.headers['set-cookie'][0]
            const cookieResult = result.headers['set-cookie'][0]
            console.log(cookieResult);



            // Assert
            expect(result.statusCode).is.equal(200)

            // extraer cookie
            const cookieData = cookieResult.split("=")
            this.cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }

            expect(this.cookie.name).to.be.ok.and.eql('coderCookie')
            expect(this.cookie).to.be.ok

        })




        // Test 03 - ruta protegida
        it("Test Ruta Protegida: Debe enviar la cookie que contiene el usuario y destructurarla correctamente.", async function () {

            // Given


            // Then
            const { _body } = await requester.get("/api/sessions/current").set('Cookie', [`${this.cookie.name}=${this.cookie.value}`]);

            console.log(_body);




            // Assert
            expect(_body.payload.email).to.be.ok.and.eql(this.mockUser.email)

        })


    })




})