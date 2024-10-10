import { Router } from "express"; 
const router = Router(); 
import CartManager from "../dao/db/cart-manager-db.js"; 
const cartManager = new CartManager() 

//Ruta para crear carrito

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito(); 
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).send("Error del servidor, vamos a re morir de antrax");
    }
})


//Lista de carrito

router.get("/:cid", async (req, res) => {
    let carritoId = req.params.cid;

    try {
        const carrito = await cartManager.getCarritoById(carritoId); 
        res.json(carrito.products); 
    } catch (error) {
        res.status(500).send("Error al obtener los productos del carrito, rata de dos patas!"); 
    }
})


//Agregar productos al carrito
router.post("/:cid/product/:pid", async (req, res) => {
    let carritoId = req.params.cid; 
    let productoId = req.params.pid; 
    let quantity = req.body.quantity || 1; 

    try {
        const actualizado = await cartManager.agregarProductosAlCarrito(carritoId, productoId, quantity); 
        res.json(actualizado.products); 
    } catch (error) {
        res.status(500).send("Error al agregar un producto, moriremos");
    }
})

export default Router 

