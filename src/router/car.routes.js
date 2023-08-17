import { Router } from "express";
import CarManager from "../controladores/carManger.js";
import Carritos from "../dao/dbManagers/carros.js";
import passport from "passport";


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
    const {idc,idp}=req.params
    let agregar= await carrosdb.ingresarProducto(idc,idp)
    res.json({statusL:"success", payload: agregar})
 })
// crear ticket

rutasCarritos.post("/:idc/crear-ticket"),async(req,res)=>{
   
   const {idc} = req.params;

   let ticket = await carrosdb.crearTicket(idc)
   console.log(ticket);
   res.send({ status: "succes", payload: ticket })
}
// eliminar producto
rutasCarritos.delete("/:idc/:idp",async(req,res)=>{
   const {idc,idp}=req.params
   let eliminar = await carrosdb.eliminarProducto(idc,idp)
   res.json({statusL:"success", payload: eliminar})

})


export default rutasCarritos