import mongoose from "mongoose";
import UsersDao from "../../src/dao/Users.dao.js";
import Assert from 'assert'
import { log } from "console";

mongoose.connect(`mongodb://localhost:27017/clase40-adoptme-test?retryWrites=true&w=majority`)

const assert = Assert.strict;


// Creamos el contexto
describe('Testing User Dao', () => {

    before(function () {
        this.userDao = new UsersDao()
    });

    beforeEach(function () {
        this.timeout(5000);
        mongoose.connection.collections.users.drop();
    });

    // Test 01
    it('El Dao debe devolver los usuarios en forma de arreglo', async function () {
        // Given
        console.log(this.userDao);
        const isArray = true

        // Then
        const result = await this.userDao.get();
        console.log(`El resultado es un Array? : ${Array.isArray(result)}`);

        Assert
        assert.strictEqual(Array.isArray(result), isArray);
    })


    // Test 02
    it('El Dao debe agregar el usuario correctamente a la DB', async function () {
        // Given
        let mockUser = {
            first_name: "Usuario de prueba 1",
            last_name: "Apellido de prueba 1",
            email: "correodeprueba3@gmail.com",
            password: "123456"
        }

        // Then
        const result = await this.userDao.save(mockUser);


        // Assert
        assert.ok(result._id)

    })

})