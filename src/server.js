import express from 'express';
import ProductManager from './controladores/productManager.js';

const producto = new ProductManager();
const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// tener todos los productos
app.get("/productos", async(req,res)=>{
 res.send(await producto.getProducto());
});
// optener producto.id
app.get("/productos/:id", async(req,res)=>{
    let id = parseInt(req.params.id)
    res.send(await producto.getProductoById(id));
   })

app.delete("/productos/:id" , async(req,res)=>{
    let id = parseInt(req.params.id)
    res.send(await producto.deleteProducts(id));
})
//agregar producto por  thunder client
app.put("/productos/:id" , async(req,res)=>{
    let id = parseInt(req.params.id);
    let update = req.body;
    res.send(await producto.updateProduc(id,update));

})

app.post("/productos", async(req,res)=>{
  
   const{title, description,price,thumbnail,code,stock}=req.body;
   const id = await producto.sumarid()
   console.log(id);
   const nuevoProducto = {id,title, description,price,thumbnail,code,stock};
   res.send(await producto.crearProducto(nuevoProducto));
   console.log(nuevoProducto);
})

app.listen(puerto, ()=>{
    console.log("Trabajando por el puerto 8080"); 
})

