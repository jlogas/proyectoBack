import { productoModel } from "../models/productos.js";

export default class Producto{

    constructor(){
        console.log("instancio Producto con mongodb");
    }

    getAll = async()=>{
        let productos = await productoModel.find()
        return productos.map(producto => producto.toObject())
    }

    crearProducto = async(producto)=>{
        let nuevoProducto = await productoModel.create(producto)
        return nuevoProducto 
    }

    filtrarProducto = async(id)=>{
        let productoFiltrado = await productoModel.aggregate([
            {
                $match:{_id: id},
            }
        ])
        console.log(productoFiltrado);
        return productoFiltrado
    }
} 

const prueba = new Producto()

