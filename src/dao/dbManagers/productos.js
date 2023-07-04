import { productoModel } from "../models/productos.js";

export default class Producto{

    constructor(){
        console.log("instancio Producto con mongodb");
    }

    getAll = async()=>{
        let productos = await productoModel.find().lean()
        console.log(productos);
        return productos
    }

    getAllPaginate = async( categoryR,ordenR,limitR,pageR)=>{
            const limit = parseInt(limitR,10)|| 10;
            const page = parseInt(pageR,1)|| 1;
            const orden = parseInt(ordenR);
            const filtro = {}
            if (categoryR) {
                filtro.category = categoryR
            };
         let productos = await productoModel.paginate(filtro,{limit,page, sort:{price:orden}})
         .then(function (result) {
            const data = {
                 arreglo:result.docs,
                 totalDocs:result.totalDocs,
                 limit:result.limit,
                 page:result.page,
                 totalPages:result.totalPages,
                 page:result.page,
                 pagingCounter:result.pagingCounter,
                 hasPrevPage:result.hasPrevPage,
                 hasNextPage:result.hasNextPage,
                 prevPage:result.prevPage,
                 nextPage:result.nextPage
            }
            
            //console.log("info paginate", data);
            return data
          })

          return productos
          
    };

    crearProducto = async(producto)=>{
        let nuevoProducto = await productoModel.create(producto)
        return nuevoProducto 
    }

    filtrarProducto = async(id)=>{
        let productoFiltrado = await productoModel.find({_id:id})
        return productoFiltrado
    }
} 

 //const prueba = new Producto()
//prueba.getAllPaginate() 