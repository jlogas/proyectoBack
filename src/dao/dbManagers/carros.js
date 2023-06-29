import { carroModel } from "../models/carros.js";
import Producto from "./productos.js";

const producto = new Producto()

export default class Carritos{

    constructor(){
        console.log("instacion carritos con mongodb");
    }

  

    crearCarrito = async(carrito)=>{
        let newCarrito = await carroModel.create(carrito) 
        return newCarrito
    }

    ingresarProducto = async(idc,idp)=>{
        let carro = await carroModel.findById(idc).populate("productos.producto")
        console.log(carro);
        carro.productos.push({producto:idp})
        await carroModel.updateOne({_id:idc},carro)
        return carro
    }

    elimiarProducto= async(idc,idp)=>{
        let carro = await carroModel.findOne({_id:idc}).populate("productos.producto")
        console.log(carro);
    }

    getAllCarritos = async()=>{
        let carritos = await carroModel.find().lean().populate("productos.producto")
       //  console.log(carritos);
         console.log(JSON.stringify(carritos, null, "\t"));
        return carritos
    }
    filtrarCarro = async(idc)=>{
        let carrito = await carroModel.findOne({_id:idc}).populate("productos.producto")
        console.log(JSON.stringify(carrito, null, "\t"));
        return carrito
    }


}

const prueba = new Carritos()
prueba.elimiarProducto("649c3660e6fade7b1c6a2d01","6499cdce713bae8324590b6b")