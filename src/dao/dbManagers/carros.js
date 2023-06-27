import { carroModel } from "../models/carros.js";
import Producto from "./productos.js";

const producto = new Producto()

export default class Carritos{

    constructor(){
        console.log("instacion carritos con mongodb");
    }

    getAllCarritos = async()=>{
        let carritos = await carroModel.find()
        return carritos.map(carro =>carro.toObject())
    }

    ingresarProducto = async(idc,idp)=>{
        let carro = await carroModel.findById(idc).populate("productos.producto")
        console.log(carro);
        carro.productos.push({producto:idp})
        let resultado = await carroModel.updateOne({_id:idc},carro)
        console.log(resultado);
    }

}
