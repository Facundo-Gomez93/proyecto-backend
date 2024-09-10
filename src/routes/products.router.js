const express = require("express"); 
const router = express.Router(); 
const ProductManager = require("../dao/db/product-manager-db.js"); 
const manager = new ProductManager();

//Listar todos los productos: 

router.get("/", async (req, res) => {
    const arrayProducts = await manager.getProducts(); 
    res.send(arrayProducts); 
})

//Buscar producto por id

router.get("/:pid", async (req, res) => {
    let id = req.params.pid; 
    try {
        const product = await manager.getProductById(id); 

        if(!product) {
            res.send("Producto no encontrado"); 
        } else {
            res.send(product); 
        }
    } catch (error) {
        res.send("Error al buscar ese id en los productos"); 
    }
})

//Agregar nuevo producto

router.post("/", async (req, res) => {
    const newProduct = req.body;
    
    try {
        await manager.addProduct(newProduct); 

        res.status(201).send("Producto agregado exitosamente"); 
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
})

//Ruta Put para actualizar
router.put ("/api/products/:pid", async (req, res) => {
const pid = rep.params.pid;
const product = req.body;
try {
    await manager.updateProduct(pid, product);
    res.status(200).send("Producto actualizado");
} catch (error) {
    console.log(error);
}
}
);

//Ruta para eliminar
router.delete("api/products/:pid", async (req, res) => {
const pid = req.params.pid
try {
    manager.deleteProduct(pid);
    res.status(400).send("Producto eliminado");
} catch (error) {
    res.status(500).send("Error al eliminar producto");
}
}
);


module.exports = router; 
