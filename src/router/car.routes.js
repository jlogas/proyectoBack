import { Router } from "express";
import CarManager from "../controladores/carManger.js";

const rutasCarritos = Router()
const carros = new CarManager

rutasCarritos.post("/", async(req,res)=>{
    res.send( await carros.agregarCarrito())
})

rutasCarritos.get("/",async(req,res)=>{
    res.send(await carros.getcarro())
})
rutasCarritos.get("/",async(req,res)=>{
    res.send(await carros.getcarro())
})

rutasCarritos.get("/:id", async(req,res)=>{ 
    let id = parseInt(req.params.id)
res.send(await carros.getcarroById(id))
})

rutasCarritos.post("/:carroid/productos/:productoid", async(req,res)=>{
 let idCarro = req.params.carroid;
 let idproductos = req.params.productoid;
 res.send(await carros.addProductoCarrito(idCarro,idproductos));
})

export default rutasCarritos