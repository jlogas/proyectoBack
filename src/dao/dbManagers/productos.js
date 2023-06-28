import { productoModel } from "../models/productos.js";

export default class Producto{

    constructor(){
        console.log("instancio Producto con mongodb");
    }

    getAll = async()=>{
        let productos = await productoModel.find()
        console.log(productos);
        return productos.map(producto => producto.toObject())
    }

    getAllPaginate = async(limit,page)=>{
        let productos = await productoModel.paginate({},{limit:limit,page:page})
        return productos
    };

    crearProducto = async(producto)=>{
        let nuevoProducto = await productoModel.create(producto)
        return nuevoProducto 
    }

    filtrarProducto = async(id)=>{
        let productoFiltrado = await productoModel.find({_id:id})
        console.log(productoFiltrado);
        return productoFiltrado
    }
} 

// const prueba = new Producto()
// prueba.getAllPaginate(1,2)