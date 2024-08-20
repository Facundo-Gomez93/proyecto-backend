const express = require("express");
const router = express.Router();
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/products.json");


router.get ("/products", async (req, res) => {
    const productos = await manager.getProducts();

    res.render ("home", {productos} );
}
)

router.get ( "/realtimeproducts", (req, res) => {
    res.render ("realtimeproducts")
}
)


module.exports = router;
