import express from 'express';
import ProductManager from './controladores/productManager.js';
import rutas from './router/products.routes.js';
import rutasCarritos from './router/car.routes.js';
import { engine } from 'express-handlebars';
import path from "path";
import __dirname from './utils.js';
import { Server} from 'socket.io';


const producto = new ProductManager();
const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))
app.use("/", express.static(__dirname + "/public"))

app.use("/", async(req, res)=>{
    let allProducts = await producto.getProducto()
    res.render("home",
    {
        title:"coder",
        productos: allProducts
    })
})

app.use("/api/productos", rutas)
app.use("/api/carrito", rutasCarritos)

const httpServer = app.listen(puerto, ()=>{
    console.log("Trabajando por el puerto 8080"); 
})

const io = new Server(httpServer);

const messages = [];

io.on("connection", (socket) => {
  console.log("A user connected");
  io.emit("messageLogs", messages);

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageLogs", messages);
  });
});



