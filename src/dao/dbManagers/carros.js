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
        let resultado = await carroModel.updateOne({_id:idc},carro)
        return resultado
    }

    getAllCarritos = async()=>{
        let carritos = await carroModel.find().lean()
 //       carritos.map(carro =>carro.toObject())
         console.log(carritos);
        return carritos
    }

}

// const prueba = new Carritos()

// prueba.getAllCarritos()