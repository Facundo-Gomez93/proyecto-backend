
const fs = require("fs").promises;


class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct({ title, description, price, img, code, stock, category }) {

        if (!title || !description || !price || !img || !code || !stock || !category) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        //2) Validacion: 

        if (this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico");
            return;
        }

        //3) Crear el producto, pero que tenga el id autoincrementable. 
        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock, 
            category
        }

        //4) Metemos el producto al array. 
        this.products.push(newProduct);

        //5) Lo guardamos en el archivo: 
        await this.guardarArchivo(this.products);
    }

    async getProducts() {
        try {
            const arrayProducts = await this.leerArchivo(); 
            return arrayProducts;
        } catch (error) {
            console.log("Error al leer el archivo", error); 
        }

    }

    async getProductById(id) {
        try {
            const arrayProducts = await this.leerArchivo();
            const buscado = arrayProducts.find(item => item.id === id); 

            if (!buscado) {
                console.log("Producto no encontrado"); 
                return null; 
            } else {
                console.log("Producto encontrado"); 
                return buscado; 
            }
        } catch (error) {
            console.log("Error al buscar por id", error); 
        }
    }

    //Auxiliares 
    async leerArchivo() {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const arrayProducts = JSON.parse(respuesta);
        return arrayProducts;
    }

    async guardarArchivo(arrayProducts) {
        await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
    }

    //Actualizar productos

    async updateProduct(id, productoActualizado) {
        try {
            const arrayProducts = await this.leerArchivo(); 

            const index = arrayProducts.findIndex( item => item.id === id); 

            if(index !== -1) {
                arrayProducts[index] = {...arrayProducts[index], ...productoActualizado} ; 
                await this.guardarArchivo(arrayProducts); 
                console.log("Producto actualizado"); 
            } else {
                console.log("No se encuentra el producto"); 
            }
        } catch (error) {
            console.log("Tenemos un error al actualizar productos"); 
        }
    }

    //Borrar Productos

    async deleteProduct(id) {
        try {
            const arrayProducts = await this.leerArchivo(); 

            const index = arrayProducts.findIndex( item => item.id === id); 

            if(index !== -1) {
                arrayProducts.splice(index, 1); 
                await this.guardarArchivo(arrayProducts); 
                console.log("Producto eliminado"); 
            } else {
                console.log("No se encuentra el producto"); 
            }
        } catch (error) {
            console.log("Tenemos un error al eliminar productos"); 
        }
    }

}

module.exports = ProductManager; 