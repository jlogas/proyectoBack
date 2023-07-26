import { Router } from "express";
import CarManager from "../controladores/carManger.js";
import Carritos from "../dao/dbManagers/carros.js";
import { authorization } from "../config/passport.config.js";


const rutasCarritos = Router()
const carros = new CarManager
const carrosdb = new Carritos()




// obtener todo los carritos
rutasCarritos.get("/", async(req,res)=>{
    let carro = await carrosdb.getAllCarritos()
    res.json({statusL:"success", payload: carro})
}) 

// agregar carrito 
 rutasCarritos.post("/",async(req,res)=>{
    const {producto}=req.body
    let newCarrito = await carrosdb.crearCarrito({producto})
    res.json({statusL:"success", payload: newCarrito})
 })

 // agregar producto al carro

 rutasCarritos.post("/:idc/:idp",async(req,res)=>{
    const {idc,idp,cantidad}=req.body
    let agregar= await carrosdb.ingresarProducto({idc,idp,cantidad})
    res.json({statusL:"success", payload: agregar})
 })
// crear ticket

rutasCarritos.post("/:idc/purchase"), async(req,res)=>{
   const {idc} = req.params.idc;
   let ticket = await carrosdb.crearTicket(idc)
   res.send({ status: "succes", payload: ticket })
}

export default rutasCarritos