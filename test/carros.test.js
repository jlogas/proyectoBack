import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080')

const mockCarro = {
    productos:[]
};

describe("testing de carritos", ()=>{
    describe("testing de crear carro", ()=>{

        it("endpoint crear carro POST /api/carrito/", async()=>{
            const{ statusCode,ok,_body} = await requester
            .post("/api/carrito")
            .send(mockCarro);
            expect(_body.payload).to.have.property("_id")
            console.log(_body);
            console.log(ok);
            console.log(statusCode);

        })
    })
    describe("testing llamar carros" , ()=>{
        it("endpoint obtener todos los carritos GET /api/carrito", async () => {
            const { statusCode, body } = await requester
            .get("/api/carrito");
            expect(statusCode).to.equal(200);
            expect(body).to.be.an("array");
        });
    })
})

