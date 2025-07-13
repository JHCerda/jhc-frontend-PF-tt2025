document.addEventListener("DOMContentLoaded",() => { 
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const renderizarProductos = () => {
    fetch("https://dummyjson.com/products/category/mens-shirts")
      .then((res) =>res.json()) 
      .then((shirts) => { 
        let contenedorProductos = document.getElementById("productos-container");
        for (const producto of shirts.products){
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

          let btnAgregar = document.createElement("button");
          btnAgregar.classList.add("btn-agregar");
          btnAgregar.textContent ="Agregar";

            btnAgregar.addEventListener("click", ()=> {
              alert(`${producto.title} agregado al carrito`);
              agregarProducto(producto);
              actualizarAgregados();
            });

            tarjetaProducto.appendChild(imagenProducto);
            tarjetaProducto.appendChild(tituloProducto);
            tarjetaProducto.appendChild(precioProducto);
            tarjetaProducto.appendChild(btnAgregar);

            contenedorProductos.appendChild(tarjetaProducto);
        }
      })
      .catch(err => console.error("Error: ",err));
    }

  const agregarProducto = (producto) => {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito))
    };

  const actualizarAgregados = () => {
    const contador = document.getElementById("contador");
    contador.textContent = carrito.length;
    };
  renderizarProductos();
  actualizarAgregados();
});

