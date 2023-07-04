import { promises} from "fs";
import ProductManager from "./productManager.js";

const productos =  new ProductManager

class CarManager{
    constructor(){
        this.path = "src/modelos/carrito.json"
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
        return index;
    }
    agregarCarrito =async()=>{
        let carros =  await this.parsearArray();
        let id = await this.sumarId(carros);
        let concatenacion = [{id:id , productos:[]}, ...carros];
        await this.escribirArray(concatenacion)
        console.log(this.getcarro());
        return "carroAgregado"
    };

    getcarroById = async(id)=>{
        let carritos = await this.parsearArray();
        let arrayId = carritos.find(carro => carro.id === id);
        console.log(arrayId);
        return arrayId;
    }

    addProductoCarrito = async(idCarro,idProductos)=>{
        let arrayCarro = await this.getcarro();
        let carroId = await this.getcarroById(idCarro);

        if (carroId.productos.same(prod => prod.id === idProductos)){
            let cantidadProductos = carroId.find(prod => prod.id === idProductos)
            cantidadProductos.cantidad++
        }
        
        let productoid = await productos.getProductoById(idProductos);
        let filtrarCarro = arrayCarro.filter(carro => carro.id != idCarro);
        let concatenacion = [{id: idCarro,productos: [{id:productoid.id, cantidad:1}]}, ...filtrarCarro]
        console.log(concatenacion);
        await this.escribirArray(concatenacion)
        return "se agrego producto"
        
    }
}

const carrito = new CarManager



export default CarManager