import { promises, existsSync,} from "fs";
import { nanoid } from "nanoid";


class ProductManager{
    static countId = 0
    constructor(){
        this.path = "/Users/juanjose/Desktop/proyectoBackend/src/modelos/productos.json"
    }
    parsearArray = async()=>{
        let productos = await promises.readFile(this.path, "utf-8")
        return JSON.parse(productos)
    }

    escribirArray = async(producto)=>{
        await promises.writeFile(this.path,JSON.stringify(producto))

    }

    sumarid = async()=>{
        let id= ProductManager.countId++
        return id
    }

    crearProducto = async(producto)=>{
       let productoParse = await this.parsearArray();
        let allProductos = [...productoParse,producto]
        await this.escribirArray(allProductos)
        return console.log("se agrego producto");
    };

    getProducto = async()=>{
    let productoParse = await this.parsearArray();
    return productoParse
    }
    getProductoById= async (id)=>{
        let productos = await this.parsearArray();
        console.log(productos);
        let arrayId = productos.find(producto => producto.id === id)
        return arrayId;
    }
    deleteProducts = async (id)=>{
        let arrayJava = await this.parsearArray();
        let arrayFilter = arrayJava.filter(pro => pro.id !=id)
        await this.escribirArray(arrayFilter);
        return console.log("producto eliminado");
    }

    validacion = async (id)=>{
        let productos = await this.parsearArray();
        return productos.find(producto => producto.id === id)
    }
    updateProduc = async (id,producto)=>{
        let productoId = await this.validacion(id);
        await this.deleteProducts(id);
        let productosViejos = await this.parsearArray()
        let productos =[{producto, id : id, ... productosViejos}]
        await this.escribirArray(productos)

    }

}
export default ProductManager

const producto = new ProductManager

producto.crearProducto()
