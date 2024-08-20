const socket = io(); 


socket.on("productos", (data) => {
    
    renderProductos(data); 
})


const renderProductos = (productos) => {
    const constenedorProductos = document.getElementById("contenedorProductos"); 
    constenedorProductos.innerHTML = ""; 

    productos.forEach(item => {
        const card = document.createElement("div"); 
        card.innerHTML = `  <p> ${item.id} </p>
                            <p> ${item.title} </p>
                            <p> ${item.price} </p>
                            <button> Eliminar </button>
                            `
        constenedorProductos.appendChild(card); 

        
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id); 
            
        })
    })
}


const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id); 
}

//Form