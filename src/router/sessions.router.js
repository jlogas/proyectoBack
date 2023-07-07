import { Router } from "express";
import userModel from "../dao/models/user.js"
import passport from "passport";
import { createHash, isValidPassword } from "../utils.js";

const routerSessions = Router();

routerSessions.post('/register', passport.authenticate ("register",{failureRedirect:"/failureredirect"}),async(req,res)=>{

    res.send({status:"success", messade: "usuario registrado"});
});

routerSessions.get("/failureredirect", async(req,res)=>{
    console.log("fallo de registro");
    res.send({error:"failed"})
})

routerSessions.post('/login', passport.authenticate("login") ,async(req,res)=>{
     if(!req.user) return res.status(400).send({status:"error", error:"dato invalidos"})
     req.session.user={
        first_name : req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
     }
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email:req.user.email
    }

    res.send({status:"success", payload:req.user})
})

routerSessions.post("/logout",(req,res)=>{
    req.session.destroy()
    res.send({status:"success"}).redirect("/")
})

export default routerSessions