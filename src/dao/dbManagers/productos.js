import { productoModel } from "../models/productos.js";

export default class Producto{

    constructor(){
        console.log("instacio Producto con mongodb");
    }

    getAll = async()=>{
        let productos = await productoModel.find()
        return productos.map(producto => producto.toObject())
    }

    crearProducto = async(producto)=>{
        let nuevoProducto = await productoModel.create(producto)
        return nuevoProducto 
    }

} 