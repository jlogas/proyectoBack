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
  res.render("carritos",{
    carritos,
    user: req.session.user
  })
})

vistaRouter.post('/api/carrito/agregar/:idp', async (req, res) => {
  const idc = "64aec0ed802346d916ff79d5"
  const { idp } = req.params;
  let carros = await carritosdb.ingresarProducto(idc,idp)
  console.log(carros);
  res.redirect("/productos");
});

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


vistaRouter.post('/api/carrito/:carritoId/crear-ticket', async (req, res) => {
  const { carritoId } = req.params;

  try {
    const nuevoTicket = await carritosdb.crearTicket(carritoId);

    if (nuevoTicket) {
      res.status(201).json({ status: 'success', ticket: nuevoTicket });
    } else {
      res.status(400).json({ status: 'error', error: 'No se pudo crear el ticket' });
    }
  } catch (error) {
    console.error('Error al crear el ticket:', error);
    res.status(500).json({ status: 'error', error: 'Ha ocurrido un error al crear el ticket' });
  }
});

export default vistaRouter;