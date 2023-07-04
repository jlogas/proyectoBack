import { Router } from "express";
import userModel from "../dao/models/user.js"


const routerSessions = Router();

routerSessions.post('/register',async(req,res)=>{
    const result = await userModel.create(req.body);
    res.send({status:"success",payload:result});
})

routerSessions.post('/login',async(req,res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email,password});
    if(!user) return res.status(400).send({status:"error",error:"Usuario o contraseña incorrectas"});

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email:user.email
    }

    res.send({status:"success"})
})

export default routerSessions