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

const formulario = document.getElementById("formulario")

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

        const title = document.getElementById('title').value;        
        const description = document.getElementById('description').value;
        const code = document.getElementById('code').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;

        if (e){
            
            socket.emit('productForm', {title,
                description,
                code,
                price,
                stock});
            console.log("enviado al socket")
        }
        
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('code').value = '';
        document.getElementById('price').value = '';
        document.getElementById('stock').value = '';  
});

