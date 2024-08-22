const express = require("express");
const app = express ()
const PUERTO = 3000;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js"); 
const viewsRouter = require("./routes/views.router.js");

const socket = require("socket.io");



//Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware: 
app.use(express.json()); 
app.use(express.static("./src/public")); 


//Rutas
app.use("/api/products", productsRouter );
app.use("/api/carts", cartsRouter); 
app.use("/", viewsRouter);





const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`); 
})

const ProductManager = require ("./managers/product-manager.js");
const manager = new ProductManager ("./src/data/products.json");


const io = socket(httpServer);


io.on("connection", async (socket) => {
    console.log("Un cliente se conecto");

    //array de productos a la vista realTimeProducts: 
    socket.emit("productos", await manager.getProducts());
    

    
    socket.on("eliminarProducto", async (id) => {
        await manager.deleteProduct(id); 

        //Despues de borrar le envio los productos actualizados al cliente: 
        io.sockets.emit("productos", await manager.getProducts());
    })

    socket.on("productForm" , async (data) => {
        //Gusrdamos productos creados
        const { title, description, price, thumbnail, code, stock, category } = data;
        await productManager.addProduct({ title, description, price, thumbnail, code, stock, category });
        socket.emit("products", await productManager.getProducts());
        console.log("Productos actualizados");
    });
    
})
