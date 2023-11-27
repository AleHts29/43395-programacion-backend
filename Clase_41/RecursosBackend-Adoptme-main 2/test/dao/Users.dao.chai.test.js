import mongoose from "mongoose";
import UsersDao from "../../src/dao/Users.dao.js";
import chai from 'chai';


mongoose.connect(`mongodb://localhost:27017/clase40-adoptme-test?retryWrites=true&w=majority`)

const expect = chai.expect;


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
        const emptyArray = [];

        // Then
        const result = await this.userDao.get();


        //Assert
        console.log(result);
        expect(result).to.be.deep.equal(emptyArray);
        expect(Array.isArray(result)).to.be.ok;
        expect(Array.isArray(result)).to.be.equal(true);
        expect(result.length).to.be.deep.equal(emptyArray.length);

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
        expect(result._id).to.be.ok;

    })

})