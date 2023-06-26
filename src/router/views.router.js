import { Router } from "express";
import Producto from "../dao/dbManagers/productos.js";

const productosdb = new Producto()

const vistaRouter = Router();
 

vistaRouter.get("/productos", async(req,res)=>{
  let productos = await productosdb.getAll()
  res.render("productos",{productos})
})

vistaRouter.get("/carritos", async(req,res)=>{
  
})

export default vistaRouter;