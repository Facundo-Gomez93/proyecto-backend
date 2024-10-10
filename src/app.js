import express from "express";
const app = express ()
const PUERTO = 3000;
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js"; 
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./dao/db/product-manager-db.js";
import  CartManager  from "./dao/db/cart-manager-db.js";
import "./database.js";
import { Server } from "socket.io";

import cookieParser from "cookie-parser";
import  passport  from "passport";
import initializePassport from "./config/passport.config.js";
import userViewsRouter from "./routes/userviews.router.js";
import {userRouter} from "./routes/user.router.js";





//Handlebars
import { engine } from "express-handlebars";

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware: 
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public")); 
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();


//Rutas
app.use("/api/products", productsRouter );
app.use("/api/carts", cartsRouter); 
app.use("/", viewsRouter);
app.use("/", userViewsRouter);
app.use("/api/sessions", userRouter);




const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`); 
})


const productManager = new ProductManager ();
const cartManager = new CartManager ();



const io = new Server(httpServer);


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



export {productManager}
export {cartManager} 