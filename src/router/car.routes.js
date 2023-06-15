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

export default rutasCarritos