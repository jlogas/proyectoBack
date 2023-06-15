import { Router } from "express";
import ProductManager from '../controladores/productManager.js';

const producto = new ProductManager();
const rutas = Router()

    // tener todos los productos
    rutas.get("/", async(req,res)=>{
        res.send(await producto.getProducto());
    });
   // optener producto.id
   rutas.get("/:id", async(req,res)=>{
       let id = parseInt(req.params.id)
       res.send(await producto.getProductoById(id));
      })
   
   rutas.delete("/:id" , async(req,res)=>{
       let id = parseInt(req.params.id)
       res.send(await producto.deleteProducts(id));
   })
   //agregar producto por  thunder client
   rutas.put("/:id" , async(req,res)=>{
       let id = parseInt(req.params.id);
       let update = req.body;
       res.send(await producto.updateProduc(id,update)); 
   })
   
   rutas.post("/", async(req,res)=>{
     
      const{title, description,price,thumbnail,code,stock}=req.body;
      const id = await producto.sumarid()
      console.log(id);
      const nuevoProducto = {id,title, description,price,thumbnail,code,stock};
      res.send(await producto.crearProducto(nuevoProducto));
      console.log(nuevoProducto);
   })

   export default rutas