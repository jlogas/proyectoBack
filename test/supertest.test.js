import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080')
 
describe("testing",  ()=>{
     describe("testing de productos", ()=>{
        const mockProduct ={
            title: "audifonos",
            description: "diadema de color negro",
            code: "afdggfd",
            price: 15000,
            status: true,
            stock: 90,
            category: "tecnologia"
        }
            it(" endpoint crear producto  POST  /api/productos" , async()=>{
            const{ statusCode,ok,_body} = await requester
            .post("/api/productos")
            .send(mockProduct);
            expect(_body.payload).to.have.property("_id")
            console.log(statusCode);
            console.log(ok);
            console.log(_body);

            })
            

     })
})