import { carroModel } from "../models/carros.js";

export default class Carritos{

    constructor(){
        console.log("instacion carritos con mongodb");
    }

    getAllCarritos = async()=>{
        let carritos = await carroModel.find()
        return carritos.map(carro =>carro.toObject())
    }
}