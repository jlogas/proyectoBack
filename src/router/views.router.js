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

vistaRouter.get("/carritos", async(req,res)=>{
  let carritos = await carritosdb.getAllCarritos()
  res.render("carritos",{carritos})
})


vistaRouter.get("/register", async(req,res)=>{
  res.render("register")
})
vistaRouter.get("/login", async(req,res)=>{
  res.render("login")
})
vistaRouter.get("/profile", async(req,res)=>{
  res.render("profile")
})
export default vistaRouter;