import express from 'express';
import rutas from './router/products.routes.js';

const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/productos", rutas)



app.listen(puerto, ()=>{
    console.log("Trabajando por el puerto 8080"); 
})

