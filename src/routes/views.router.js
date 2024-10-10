import { Router } from "express";
const router = Router();
import ProductManager from "../dao/db/product-manager-db.js";
const manager = new ProductManager();


router.get ("/products", async (req, res) => {
    const productos = await manager.getProducts();

    res.render ("home", {productos} );
}
)

router.get ( "/realtimeproducts", (req, res) => {
    res.render ("realtimeproducts")
}
)


export default router
