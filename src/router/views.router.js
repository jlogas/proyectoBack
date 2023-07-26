import { Router } from "express";
import Producto from "../dao/dbManagers/productos.js";
import Carritos from "../dao/dbManagers/carros.js";

const productosdb = new Producto()
const carritosdb = new Carritos()
const vistaRouter = Router();

vistaRouter.get("/register", async(req,res)=>{
  res.render("register")
})
vistaRouter.get("/", async(req,res)=>{
  res.render("login")
})
vistaRouter.get("/profile", async(req,res)=>{
  res.render("profile",{
    user: req.session.user
  })
})

vistaRouter.get("/productos", async(req,res)=>{
  let productos = await productosdb.getAll()
  res.render("productos",{
    productos,
    user: req.session.user
  })
})

vistaRouter.get("/carritos", async(req,res)=>{
  let carritos = await carritosdb.getAllCarritos()
  res.render("carritos",{carritos})
})

vistaRouter.get("/reset-password",(req,res)=>{
  res.render("reset_password")
})
vistaRouter.get("/reset-password/:token", async (req,res)=>{
  const {token}=req.params;
  try {
    res.render("reset",{token})
  } catch (error) {
    console.log("Error al procesar el enlace de restablecimiento de contraseña", error);
    res.status(500).send({ status: "error", error: "Ha ocurrido un error al procesar el enlace de restablecimiento de contraseña"})
  }
})

export default vistaRouter;