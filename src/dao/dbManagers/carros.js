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
        let carro = await carroModel.findById(idc).populate("productos")
        carro.productos.push({_id:idp})
        await carroModel.updateOne({_id:idc},carro)
        console.log(JSON.stringify(carro, null, "\t"));
        return carro
    }

    // elimiarProducto= async(idc,idp)=>{
        
    //     let carro = await carroModel.findOne(
    //          {_id:idc},
    //     {
    //     productos:{$elemMatch:{_id:idp}},
    //     }
    //     );

    //    let filtrado= await carroModel.updateOne({_id: idc},
    //     {$pull:{productos:{_id: idp}}},)
    //     console.log(filtrado);
    //     //     console.log(carro);
    //     //     return carro[0]
    // }


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
        let carritos = await carroModel.find().lean().populate("productos")
       console.log(carritos);
       console.log(JSON.stringify(carritos, null, "\t"));

        return carritos
    }
    filtrarCarro = async(idc)=>{
        let carrito = await carroModel.findOne({_id:idc}).populate("productos")
        console.log(JSON.stringify(carrito, null, "\t"));
        return carrito
    }


}

 const prueba = new Carritos()
 //prueba.getAllCarritos()
 //prueba.ingresarProducto("649da5b1c2f3808823763950","649d8afd150d7e4b0aa5a3d3")
// prueba.eliminarProducto("649da5b1c2f3808823763950","649d8aba150d7e4b0aa5a3d1")