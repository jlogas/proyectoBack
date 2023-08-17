import express from 'express';
import  config  from './config/config.js';
import expressHandlebars from 'express-handlebars'
import cors from 'cors';


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
import compression from 'express-compression'
 
import { addLogger } from './utils/logger.js'; 
import {logger} from './utils/logger.js'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from "swagger-ui-express";


const app = express();
const puerto = config.PORT;
const mongo = config.MONGO_URL; 
const TEST_MAIL = 'kira.haley@ethereal.email'


const corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(addLogger)

const swaggerOption = {
  definition:{
    openapi: "3.0.1",
    info:{
      title: "documentacion coderHouse",
      description:" proyecto mongo "
    },

  },
  apis: [`${__dirname}/docs/**/*.yaml`],
}

const specs = swaggerJSDoc(swaggerOption)
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

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
  html:"<h1>implementacion html </h1>",
  attacments:[
    {
      
    }
  ]
}

try {
  const email= await transporter.sendMail(emailContent)
 
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
    logger.info("Trabajando por el puerto 8080") 
})

app.use(compression())

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



