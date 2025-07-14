document.addEventListener("DOMContentLoaded", () => {

const renderizarProductos = () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    productosEnCarrito(carrito)

    let seccionProductos = document.getElementById("contenedor-carrito")
    seccionProductos.innerHTML = ""

    if (!carrito.length){
        let mensajeCarrito = document.createElement("p");
        mensajeCarrito.classList.add("mensaje-carrito");
        mensajeCarrito.textContent = "No Hay productos en el carrito.";

        seccionProductos.appendChild(mensajeCarrito);
    }else{
        carrito.forEach((producto,index) => {
            let tarjetaProducto = document.createElement("article");
            tarjetaProducto.classList.add("producto");

            let imagenProducto = document.createElement("img");
            imagenProducto.src = producto.images[0];
            imagenProducto.alr = producto.description;

            let tituloProducto = document.createElement("h3");
            tituloProducto.classList.add("titulo-producto");
            tituloProducto.textContent = producto.title;

            let precioProducto = document.createElement("p");
            precioProducto.textContent = `$${producto.price}`;

            let btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn-eliminar");
            btnEliminar.textContent ="Eliminar";

            btnEliminar.addEventListener("click", ()=> {
                alert(`${producto.title} eliminado del carrito`);
                eliminarProducto(index);                
            });

            tarjetaProducto.appendChild(imagenProducto);
            tarjetaProducto.appendChild(tituloProducto);
            tarjetaProducto.appendChild(precioProducto);
            tarjetaProducto.appendChild(btnEliminar);

            seccionProductos.appendChild(tarjetaProducto)
        });
    }
    
    
};

const renderizarBotones = () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let divAcciones = document.getElementById("acciones-carrito");
    divAcciones.innerHTML = ""

    if (carrito.length) {
        let btnVaciar = document.createElement("button");
        btnVaciar.classList.add("btn-vaciar");
        btnVaciar.textContent = "Vaciar Carrito";

        btnVaciar.addEventListener("click", () => {
            vaciarCarrito();
        })
        
        let btnFinalizar = document.createElement("button");
        btnFinalizar.classList.add("btn-finalizar");
        btnFinalizar.textContent = "Finalizar Compra";

        btnFinalizar.addEventListener("click", ()=> {
            let confirmado = confirm("Esta seguro que desea finalizar la compra?");
            if(confirmado) {
                alert("Gracias por su compra!");
                localStorage.removeItem("carrito");
                window.location.href ="index.html";
            };
        });

        let btnContinuar = document.createElement("button");
        btnContinuar.classList.add("btn-Continuar");
        btnContinuar.textContent = "Continuar Comprando"    

        btnContinuar.addEventListener("click", () => {
            window.location.href ="index.html";
        });

        divAcciones.appendChild(btnVaciar);
        divAcciones.appendChild(btnFinalizar);
        divAcciones.appendChild(btnContinuar)
    };
};

const productosEnCarrito = (carrito) => {
    const contador = document.getElementById("contador");
    contador.textContent = carrito.length;
}; 
const eliminarProducto = (index) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarProductos()
    renderizarBotones()
};
const vaciarCarrito = () => {
    localStorage.removeItem("carrito")
    alert("Se van a eliminar todos los productos del carrito")
    renderizarProductos()
    renderizarBotones()
};
renderizarProductos()
renderizarBotones()
});