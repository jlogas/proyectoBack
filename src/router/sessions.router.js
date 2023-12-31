import { Router } from "express";
import passport  from "passport";
import nodemailer from "nodemailer"

import { createHash } from "../utils.js";
import { generateRandomToken } from "../utils.js";
import { hashPassword } from "../utils.js";

import userModel from "../dao/models/user.js";

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
        rol: req.user.rol
     }
   
    res.send({status:"success", payload:req.user})
})

routerSessions.post("/logout",(req,res)=>{
    req.session.destroy()
    res.send({status:"success"}).redirect("/")
})


routerSessions.post("/olvidocontrasena", async (req, res) => {
    try {
      const { email } = req.body;

      // Verificar si el usuario existe en la base de datos
      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(404).send({ status: "error", error: "Usuario no encontrado" });
      }

      // Generar un token de restablecimiento de contraseña
      const token = generateRandomToken();

      // Actualizar el campo 'resetPasswordToken' en la base de datos
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // Expira en una hora (3600000 ms)

      await user.save();

      // Enviar un correo electrónico con el enlace de restablecimiento de contraseña
      const transporter = nodemailer.createTransport({
        // Configuración del transporte de correo (puedes usar otros proveedores como Gmail, SendGrid, etc.)

        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
          user: 'kira.haley@ethereal.email',
          pass: 'SvfJhdN3wU1AYjMrkV',
        },
      });

      const mailOptions = {
        from: "'kira.haley@ethereal.email'",
        to: email,
        subject: "Restablecimiento de contraseña",
        text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://localhost:8080/sesiones/reset-password/${token}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error al enviar el correo electrónico", error);
          return res.status(500).send({ status: "error", error: "Error al enviar el correo electrónico" });
        }

        console.log("Correo electrónico enviado:", info.response);
        res.send({ status: "success", message: "Correo electrónico enviado con el enlace de restablecimiento de contraseña" });
      });
    } catch (error) {
      console.log("Error al solicitar el restablecimiento de contraseña", error);
      res.status(500).send({ status: "error", error: "Error al solicitar el restablecimiento de contraseña" });
    }
  });


routerSessions.post("/reset-password/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      // Buscar el usuario por el token de restablecimiento de contraseña
      const user = await userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Verificar si el token no ha expirado
      });

      if (!user) {
        return res.status(400).send({ status: "error", error: "El token es inválido o ha expirado" });
      }

      // Actualizar la contraseña del usuario y eliminar el token de restablecimiento
      user.password = createHash(password);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.send({ status: "success", message: "Contraseña restablecida exitosamente" });
    } catch (error) {
      console.log("Error al restablecer la contraseña", error);
      res.status(500).send({ status: "error", error: "Error al restablecer la contraseña" });
    }
  });

  routerSessions.get("/reset-password/:token", async (req, res) => {
    const { token } = req.params;

    try {
          // Buscar el usuario en la base de datos por el token de restablecimiento de contraseña
    const user = await userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Verificar si el token no ha expirado
      });
 
      if (!user) {
        // Si el usuario no existe o el token ha expirado, mostrar un mensaje de error
        return res.status(400).send({ status: "error", error: "El token es inválido o ha expirado" });
      }


      res.render("reset", { token });
    } catch (error) {
      console.log("Error al procesar el enlace de restablecimiento de contraseña", error);
      res.status(500).send({ status: "error", error: "Ha ocurrido un error al procesar el enlace de restablecimiento de contraseña" });
    }
  });

export default routerSessions