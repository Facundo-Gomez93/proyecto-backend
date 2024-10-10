import {Router} from "express";
import UserModel from "../dao/models/users.model.js"
import CartModel from "../dao/models/cart.model.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import {createHash, isValidPassword} from "../utils/utils.js";

const userRouter = Router();

//Ruta Registro
userRouter.post("/register", async (req, res)=>{
    let {usuario, password, first_name, last_name, age, email} = req.body;

    try{
        const existeUsuario = await UserModel.findOne({usuario})
        
        if(existeUsuario){
            return res.status(400).send("Usuario Existente")
        }

        //Creo un carrito nuevo
        const nuevoCarrito = new CartModel();
        await nuevoCarrito.save

        const nuevoUsuario = new UserModel({
            usuario,
            first_name,
            last_name,
            age,
            email,
            cart: nuevoCarrito._id,
            password: createHash(password)
            
        });

        await nuevoUsuario.save();

        const token = jwt.sign({usuario: nuevoUsuario.usuario, first_name: nuevoUsuario.first_name, last_name: nuevoUsuario.last_name, age: nuevoUsuario.age, email: nuevoUsuario.email}, "coderhouse", {expiresIn: "1h"})

        //Generamos Cookie
        res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true})

        res.redirect("/api/sessions/current")

    }catch(error){
            res.status(500).send("Error del servidor al Registrar")

    }
})


//Ruta Login

userRouter.post("/login", async(req, res)=>{
    let {usuario,password} = req.body;

    try{
        //Buscar el usuario en Mongo
        const usuarioEncontrado = await UserModel.findOne({usuario});
        if(!usuarioEncontrado){
            return res.status(401).send("Usuario No Identificado")
        }

        //Se verifica Contraseña
        if(!isValidPassword(password, usuarioEncontrado)){
            return res.status(401).send("Usuario No Identificado")
        }

        const token = jwt.sign({usuario: usuarioEncontrado.usuario, first_name: usuarioEncontrado.first_name, last_name: usuarioEncontrado.last_name, age: usuarioEncontrado.age, email: usuarioEncontrado.email}, "coderhouse", {expiresIn: "1h"})

        //Generamos Cookie
        res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true})

        res.redirect("/api/sessions/current")

    }catch (error){
        res.status(500).send("Error del servidor")
    }

})

userRouter.get("/current", passport.authenticate("current", {session: false}), (req,res)=>{
    res.render("homeusers", {usuario: req.user.usuario})
})

//LOGOUT
userRouter.post("/logout", (req,res)=>{
    //Limpieza de COOKIE
    res.clearCookie("coderCookieToken")
    res.redirect("/login")
})



export {userRouter}