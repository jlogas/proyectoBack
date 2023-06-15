import { promises, existsSync,} from "fs";


class CarManager{
    constructor(){
        this.path = "/Users/juanjose/Desktop/proyectoBackend/src/modelos/carrito.json"
    }


    parsearArray = async()=>{
        let carros = await promises.readFile(this.path, "utf-8")
        return JSON.parse(carros)
    };

    escribirArray = async(carros)=>{
        await promises.writeFile(this.path,JSON.stringify(carros))
    };

    getcarro = async()=>{
    let carroParse = await this.parsearArray();
    console.log(carroParse);
    return carroParse
    };

    sumarId = async(array)=>{
        let index = array.length + 1;
        console.log(index);
        return index;
    }
    agregarCarrito =async()=>{
        let carros =  await this.parsearArray();
        let id = await this.sumarId(carros);
        let concatenacion = [{id:id , productos: [], ...carros}];
        await this.escribirArray(concatenacion)
        console.log(this.getcarro());
        return "carroAgregado"
    };
}

export default CarManager