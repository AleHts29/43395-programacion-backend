import chai from "chai";
import { createHash } from "../../src/utils/index.js";


const expect = chai.expect;


describe('Test de la libreria de bcrypt en Utils', () => {

    // Before

    // BeforeEch


    it('La funcion debe generar un pass encriptado.', async function () {
        // Give
        const passwordTest = "123qwe";


        // Then
        const result = await createHash(passwordTest);
        console.log(`Resultado obtenido con createHash: ${result}`);


        // Assert
        expect(result).not.to.be.NaN;
        expect(result).not.to.be.undefined;
        expect(result).not.to.be.null;
        expect(result).not.to.be.empty;
        expect(result).not.equal(passwordTest);
    })
})