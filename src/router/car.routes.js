import { Router } from "express";
import CarManager from "../controladores/carManger.js";
import Carritos from "../dao/dbManagers/carros.js";
import { authorization } from "../config/passport.config.js";


const rutasCarritos = Router()
const carros = new CarManager
const carrosdb = new Carritos()


// rutasCarritos.post("/", async(req,res)=>{
//     res.send( await carros.agregarCarrito()) 
// })

// rutasCarritos.get("/",async(req,res)=>{
//     res.send(await carros.getcarro())
// })
// rutasCarritos.get("/",async(req,res)=>{
//     res.send(await carros.getcarro())
// })

// rutasCarritos.get("/:id", async(req,res)=>{ 
//     let id = parseInt(req.params.id)
// res.send(await carros.getcarroById(id))
// })

// rutasCarritos.post("/:carroid/productos/:productoid", async(req,res)=>{
//  let idCarro = req.params.carroid;
//  let idproductos = req.params.productoid;
//  res.send(await carros.addProductoCarrito(idCarro,idproductos));
// })

// obtener todo los carritos
rutasCarritos.get("/",authorization("admin"), async(req,res)=>{
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


export default rutasCarritos