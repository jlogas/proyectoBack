import express from 'express';

import rutas from './router/products.routes.js';
import rutasCarritos from './router/car.routes.js';
import vistaRouter from './router/views.router.js';
import routerSessions from './router/sessions.router.js';

import { engine } from 'express-handlebars';
import path from "path";
import __dirname from './utils.js';
import { Server} from 'socket.io';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();
const puerto = 8080;

// mongodb 
await mongoose.connect("mongodb+srv://juanjlogas:coder@cluster0.apal9tl.mongodb.net/?retryWrites=true&w=majority");

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//handlebars

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"));
app.use(express.static(`${__dirname}/public`));

//iniciar sesion
app.use(session({
  store: MongoStore.create({
    mongoUrl:"mongodb+srv://juanjlogas:coder@cluster0.apal9tl.mongodb.net/?retryWrites=true&w=majority",
    ttl: 3600,
  }),
  secret: "coder",
  resave:false,
  saveUninitialized: false,
}))

//ruteo

app.use("/", vistaRouter) 
app.use("/api/sessions",routerSessions)
app.use("/api/productos", rutas)
app.use("/api/carrito", rutasCarritos)


 



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



