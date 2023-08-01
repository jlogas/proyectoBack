import { carroModel } from "../models/carros.js";
import { ticketsModel } from "../models/ticket.js";
import { productoModel } from "../models/productos.js";
import Producto from "./productos.js";

import { logger } from "../../utils/logger.js";
import { ne } from "@faker-js/faker";

const producto = new Producto()

export default class Carritos{

    constructor(){
        logger.info("instacion carritos con mongodb")
    }

  

    crearCarrito = async(carrito)=>{
        let newCarrito = await carroModel.create(carrito) 
        return newCarrito
    }

    ingresarProducto = async(idc,idp,cantidad)=>{
        let carro = await carroModel.findById(idc).populate("productos")
        carro.productos.push({_id:idp})
        await carroModel.updateOne({_id:idc},carro)
        return carro
    }


    eliminarProducto = async (cartid,productid) => {
            const { products } = await carroModel.findOne(
                { _id: cartid },
                {
                  productos: { $elemMatch: { id: productid } },
                }
              );

              await carroModel.updateOne(
                { _id: cartid },
                {
                  $pull: { productos: { _id: productid } },
                  //$set: { total: newTotal },
                }
              );
            }
    
    getAllCarritos = async()=>{
        let carritos = await carroModel.find().lean().populate("productos");
        return carritos
    }
    filtrarCarro = async(idc)=>{
        let carrito = await carroModel.findOne({_id:idc}).populate("productos")
        return carrito
    }

    crearTicket = async (cid, req) => {
      try {
        let carrito = await carroModel.findOne({ _id: cid }).populate("productos");
        const productos = carrito.productos;
    
        const productosStock = productos.filter(producto => producto.stock >= 0);
    
        if (productosStock.length === 0) {
          logger.warning("No se tienen productos suficientes para crear el ticket.");
          return; // Devuelve sin crear el ticket si no hay productos disponibles en stock.
        }
    
        const precios = productosStock.map(objeto => objeto.price);
        const suma = precios.reduce((total, precio) => total + precio, 0);
        const productosID = productosStock.map(producto => producto._id);
    
        await productoModel.updateMany(
          { _id: { $in: productosID } },
          { $inc: { stock: -1 } }
        );
    
        logger.info("Productos actualizados");
    
        let compra = {
          "code": cid,
          "amount": suma,
          "email": req.user.email
        };
    
        let result = await ticketsModel.create(compra);
        return result;
      } catch (error) {
        console.error("Error al crear el ticket:", error);
      }
    };
    
      
     
    }
const prueba = new Carritos

//prueba.crearTicket()

