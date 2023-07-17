import { carroModel } from "../models/carros.js";
import { ticketsModel } from "../models/ticket.js";
import { productoModel } from "../models/productos.js";
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

    crearTicket = async(cid)=>{
      let carrito = await carroModel.findOne({_id: cid}).populate("productos")
      const productos = carrito.productos;
      console.log(productos);
      const precios = productos.map(objeto => objeto.price);
      const suma = precios.reduce((total, precio) => total + precio, 0);
      console.log(suma);

     
            
        try {

          let compra ={
            "code": cid,
            "amount": suma,
            "email": ""
          }
          
         let result = await ticketsModel.create(compra)
        } catch (error) {
          
        }
      }
      
     
    }


const prueba = new Carritos()

prueba.crearTicket("649da5b1c2f3808823763950")