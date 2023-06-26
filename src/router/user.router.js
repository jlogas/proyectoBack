import { Router } from "express";
import { userModel } from "../modelos/user.models.js";


const router =Router();


router.get("/", async (req, res) => {
    try {
      let users = await userModel.find();
      console.log("exitoso");
      res.json({ result: "success", payload: users });
      
    } catch (err) {
      console.log("Cannot get users:" + err);
    }
  });


  
  export  default router