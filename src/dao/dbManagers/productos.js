import { productoModel } from "../models/productos.js";
import mongoose from "mongoose";

export default class Producto{

    constructor(){
        console.log("instancio Producto con mongodb");
    }

    getAll = async()=>{
        let productos = await productoModel.find()
        console.log(productos);
        return productos.map(producto => producto.toObject())
    }

    getAllPaginate = async( category,orden,limit,page)=>{
        let productos = await productoModel.paginate({category:category},{limit:limit,page:page, sort:{price:orden}})
        console.log(productos);
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

// prueba = new Producto()
// prueba.getAllPaginate("deportes",1,2,1)