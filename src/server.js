import express from 'express';
import rutas from './router/products.routes.js';
import rutasCarritos from './router/car.routes.js';
import router from './router/user.router.js';
import vistaRouter from './router/views.router.js';
import { engine } from 'express-handlebars';
import path from "path";
import __dirname from './utils.js';
import { Server} from 'socket.io';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();
const puerto = 8080;
// mongodb 
await mongoose.connect("mongodb+srv://juanjlogas:coder@cluster0.apal9tl.mongodb.net/?retryWrites=true&w=majority");

app.use(express.json());
app.use(express.urlencoded({extended:true}));




//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))
app.use("/", express.static(__dirname + "/public"))


//ruteo
app.use("/api/productos", rutas)
app.use("/api/carrito", rutasCarritos)
app.use("/", vistaRouter)
app.use("/api/usuarios", router);
 
//cookie

app.use(cookieParser("Coder"))

// crear cookie
app.get("/setCookie", async(req,res)=>{
  res
  .cookie("CoderCookie","esta es una cookie muy poderosa",{maxAge:10000000})
  .send("Cookie")
  });

  app.get("/setSingCookie", async(req,res)=>{
    res
    .cookie("SingCookie","esta es una cookie muy poderosa",{maxAge:10000,signed: true})
    .send("Cookie")
  
  });
//optener cookie
app.get("/getCookies", async (req,res)=>{
  res.send(req.cookies)
})

app.get("/getSignedCookies", async (req,res)=>{
  res.send(req.signedCookies)
})
//borrar cookie
app.get("/deleteCookie", async(req,res)=>{
  res.clearCookie("CoderCookie").send("Cookie removed")
})

const httpServer = app.listen(puerto, ()=>{
    console.log("Trabajando por el puerto 8080"); 
})


//socket
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



