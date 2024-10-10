import mongoose from "mongoose";

mongoose.connect("mongodb+srv://facugomez61193:dev1393@cluster0.q9j8y.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("Conexión exitosa"))
    .catch( (error)=> console.log("Error", error)) 