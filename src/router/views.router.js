import { Router } from "express";
import Producto from "../dao/dbManagers/productos.js";
import Carritos from "../dao/dbManagers/carros.js";

const productosdb = new Producto()
const carritosdb = new Carritos()
const vistaRouter = Router();
 

vistaRouter.get("/productos", async(req,res)=>{
  let productos = await productosdb.getAll()
  res.render("productos",{productos})
})

vistaRouter.get("/productosf", async(req,res)=>{
  let category = req.query.category
  let orden = req.query.orden
  let limit = req.query.limit
  let pages = req.query.pages
  let productosPaginate = await productosdb.getAllPaginate(category,orden,limit,pages)
  res.render("paginate",{productosPaginate})
})






vistaRouter.get("/carritos", async(req,res)=>{
  let carritos = await carritosdb.getAllCarritos()
  res.render("carritos",{carritos})
})

export default vistaRouter;