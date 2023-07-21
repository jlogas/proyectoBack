import { Router } from "express";
import ProductManager from '../controladores/productManager.js';
import Producto from "../dao/dbManagers/productos.js";
import generate from "../utils/productosMock.utils.js";
import generateUserErrorInfo from "../utils/errores/info.errors.js"
import EnumErrors from "../utils/errores/enum.errors.js";
import CustomErrors from "../utils/errores/custom.errors.js";

const producto = new ProductManager();
const productoDb = new Producto();
const rutas = Router()


   //mondb
   

   //mock
         rutas.get("/mock", (req, res)=>{
         const mock = generate(100);
         res.send(mock)
         })
   //llamar a los productos          
        rutas.get("/todos", async(req,res)=>{
            let producto = await productoDb.getAll()
            res.json({status:"success", payload: producto})
        })
   // crear producto
        rutas.post("/", async(req,res)=>{
         const {title, description,code,price,status,stock,category} = req.body
         if (!title||!description || !code || !price || !stock || !category) {
            CustomErrors.createError({
            name: "error en la creacion del producto",
            cause: generateUserErrorInfo({ first_name, last_name, email }),
            message: "No se cumple con las espicificaciones del Schema ",
            code: EnumErrors.INVALID_TYPES_ERROR,
            })
         }
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
         let result = await productoDb.getAllPaginate(category,orden,limit,pages)
         res.json({status:"success",payload: result.arreglo, 
           info:{
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
          })
         });

         //mock

   

   
   



   export default rutas