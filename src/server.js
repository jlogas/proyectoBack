import express from 'express';
import  config  from './config/config.js';

import vistaRouter from './router/views.router.js';
import mainRouter from './router/index.js';
import { engine } from 'express-handlebars';
import path from "path";
import __dirname from './utils.js';
import { Server} from 'socket.io';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import passport from 'passport';
import initializePassport from './config/passport.config.js';

import { createTransport } from 'nodemailer';



const app = express();
const puerto = config.PORT;
const mongo = config.MONGO_URL; 
const TEST_MAIL = 'kira.haley@ethereal.email'

//nodemailer//etheral
const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: TEST_MAIL,
      pass: 'SvfJhdN3wU1AYjMrkV'
  }
});
//DATA
const emailContent = {
  from: "mi primer proyecto con nodemailer",
  to: `desarrollador <${TEST_MAIL}>`,
  subject: "primera prueba correo",
  text: "buenas...",
  html:"<h1>implementacion html </h1>"
}

try {
  const email= await transporter.sendMail(emailContent)
  console.log(email);
} catch (err) {
  console.log("ERROR",err);
}


// config

console.log(config);

// mongodb 
await mongoose.connect(mongo)
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
    mongoUrl:mongo,
    ttl: 3600,
  }),
  secret: "coder",
  resave:false,
  saveUninitialized: false,
}));
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//ruteo
app.use("/", vistaRouter) 
app.use("/api", mainRouter)


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



