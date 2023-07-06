import { Router } from "express";
import userModel from "../dao/models/user.js"
import { createHash } from "../utils.js";
import { isValidPassword } from "../utils.js";

const routerSessions = Router();

routerSessions.post('/register',async(req,res)=>{

    const {first_name,last_name,email,age,password}=req.body

    if(!first_name || !last_name || !email || !age || !password) res.status(400).send({status:"error", error: "faltan datos"});//validacion de datos
    let user={
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
    }
    const result = await userModel.create(user);// usuario con el password "hasheado"
    res.send({status:"success",payload:result});
})

routerSessions.post('/login',async(req,res)=>{
    const {email, password} = req.body;
    if(!email|| !password) res.status(400).send({status:"error", error: "faltan datos"});//validacion de datos

    const user = await userModel.findOne({email});
    if(!user) return res.status(400).send({status:"error",error:"Usuario no existe"});//validacion de usuario
    if(!isValidPassword(user,password)) return res.status(403).send({status:"error",error: "datos erroneos"});


    delete user.password;// borrar contrasena con el login
    req.session.user=user;

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email:user.email
    }

    res.send({status:"success", payload:user})
})

routerSessions.post("/logout",(req,res)=>{
    req.session.destroy()
    res.send({status:"success"}).redirect("/")
})

export default routerSessions