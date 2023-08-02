import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080')
const mockProduct ={
    title: "audifonos",
    description: "diadema de color negro",
    code: "afdggfd",
    price: 15000,
    status: true,
    stock: 90,
    category: "tecnologia"
}
describe("testing de productos",  ()=>{
     describe("testing de crear productos", ()=>{
        
            it(" endpoint crear producto  POST  /api/productos" , async()=>{
            const{ statusCode,ok,_body} = await requester
            .post("/api/productos")
            .send(mockProduct);
            expect(_body.payload).to.have.property("_id")
            

            })
            

     })
     describe("testing de llamar producto por id", ()=>{
        it("endpoint obtener producto por ID GET /api/productos/:id", async()=>{
            const producto = await requester.post("/api/productos").send(mockProduct);
            const productoid = producto.body.payload._id;
            const {statusCode,body} = await requester.get(`/api/productos/${productoid}`)
            expect(statusCode).to.equal(200);
        })      
     })
})