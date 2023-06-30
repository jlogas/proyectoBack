import { Router } from "express";
import ProductManager from '../controladores/productManager.js';
import Producto from "../dao/dbManagers/productos.js";

const producto = new ProductManager();
const productoDb = new Producto();
const rutas = Router()

//     // tener todos los productos
//     rutas.get("/", async(req,res)=>{
//         res.send(await producto.getProducto());
//     });
//    // optener producto.id
//    rutas.get("/:id", async(req,res)=>{
//        let id = parseInt(req.params.id)
//        res.send(await producto.getProductoById(id));
//       })
   
//    rutas.delete("/:id" , async(req,res)=>{
//        let id = parseInt(req.params.id)
//        res.send(await producto.deleteProducts(id));
//    })
//    //agregar producto por  thunder client
//    rutas.put("/:id" , async(req,res)=>{
//        let id = parseInt(req.params.id);
//        let update = req.body;
//        res.send(await producto.updateProduc(id,update)); 
//    })
   
//    rutas.post("/", async(req,res)=>{
     
//       const{title, description,price,thumbnail,code,stock}=req.body;
//       const id = await producto.sumarid()
//       console.log(id);
//       const nuevoProducto = {id,title, description,price,thumbnail,code,stock};
//       res.send(await producto.crearProducto(nuevoProducto));
//       console.log(nuevoProducto);
//    }) 

   //mondb

   //llamar a los productos 
        rutas.get("/todos", async(req,res)=>{
            let producto = await productoDb.getAll()
            res.json({status:"success", payload: producto})
        })
   // crear producto
        rutas.post("/", async(req,res)=>{
         const {title, description,code,price,status,stock,category} = req.body
         let nuevoProducto = await productoDb.crearProducto({
            title,
            description,
            code,
            price,
            status,
            stock,
            category
         })
         res.json({status:"success", payload: nuevoProducto})
        }) 
      // llamar po id
        rutas.get("/:id", async(req,res)=>{
            let id =req.params.id
            let producto = await productoDb.filtrarProducto(id)
            res.json({status:"success",payload: producto})
         })

      // paginate

      rutas.get("/", async(req,res)=>{
         let category = req.query.category
         let orden = req.query.orden
         let limit = req.query.limit
         let pages = req.query.pages
         let productosPaginate = await productoDb.getAllPaginate(category,orden,limit,pages)
         res.json({status:"success",payload: productosPaginate.arreglo})
      })





   export default rutas