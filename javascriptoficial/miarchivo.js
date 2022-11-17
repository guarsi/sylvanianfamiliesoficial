const sylvanian = [
  {
    img: "./imagenes/tuxedocatfamily.jpg",
    id: "57",
    title: "TuxedoCatFamily",
    cantidad: 1,
    price: 13500,
    pieces: "4",
  },
  {
    img: "./imagenes/resthambur.webp",
    id: "62",
    title: "Restaurante de hamburguesas (solo incluye el restaurante y sus accesorios)",
    cantidad: 1,
    price: 20200,
    pieces: "22",
  },

  {
    img: "./imagenes/whiterabbitfamily.jpg",
    id: "71",
    title: "WhiteRabbitFamiliy edición limitada 11 piezas",
    cantidad: 1,
    price: 27000,
    pieces: "11",
  },

  {
    img: "./imagenes/cottagesylvanian.jpg",
    id: "15",
    title: "Cabaña Sylvanian",
    cantidad: 1,
    price: 15500,
    pieces: "20",
  },
  {
    img: "./imagenes/koalafamily.jpg",
    id: "50",
    title: "Koala Family",
    cantidad: 1,
    price: 7000,
    pieces: "3",
  },
  {
    img: "./imagenes/sylvanianavidad.jpg",
    id: "25",
    title: "Navidad Sylvanian",
    cantidad: 1,
    price: 27000,
    pieces: "9",
  },
  {
    img: "./imagenes/sylvaniansupermarket.webp",
    id: "42",
    title: "Supermercado Sylvanian (solo inlcuye el supermercado y sus prodructos",
    cantidad: 1,
    price: 35000,
    pieces: "35",
  },
  {
    img: "./imagenes/sylvaniantrain.jpg",
    id: "60",
    title: "Tren Sylvanian (solo incluye el tren y dos sylvanian",
    cantidad: 1,
    price: 18000,
    pieces: "4",
  },
];

let carrito = [];

//query
const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const tituloPrecio = document.querySelector("#precioTotal");
const totalProceso = document.querySelector("#totalProceso");
const activarFuncion= document.querySelector("#activarFuncion")

if(activarFuncion === true){
  activarFuncion.addEventListener ('click', procesarCompra) 
}




//storage carrito
document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || []
  let precioTotal = 0;
  vaciarCarrito.addEventListener("click", () => {
    carrito = [];
    mostrarCarrito();
  });

  if(procesarCompra){
  continuarCompra.addEventListener('click', () => {
    if(carrito.length === 0){
      Swal.fire({
        title: "Carrito de compras vacio!",
        text: "Debes comprar algo para continuar con la compra",
        position: 'center',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500
      
    }  
  )}else {
    location.href = "compra.html";
    procesarCompra()
  }
});
}

//cards
  function editandoHtml(){
    for (const prod of sylvanian){
      const divProducto = document.createElement("div");
    divProducto.innerHTML += `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${prod.img}" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">${prod.title}</h5>
    <p class="card-text">Precio:${prod.price} $</p>
    <p class="card-text">Piezas:${prod.pieces}</p>
    <button class="btn btn-outline" style="background-color:#FBE9AC;width:100%;border-radius:100px;" id="button${prod.id}" >Comprar Producto</button>
    </div>
    </div>
    `;
    contenedor.appendChild(divProducto);}

    //evento

    sylvanian.forEach(prod => {
      document.getElementById(`button${prod.id}`).addEventListener("click", () => {
        agregarAlCarrito(prod.id);
      })
    })

  }
  editandoHtml();

  // seleccionar el carrito icono y agregarle el evento :)

  carritoIcono = document.querySelector("#carritoContenedor");
  carritoIcono.addEventListener("click", () => {
    mostrarCarrito();
  });

  //carrito
  const agregarAlCarrito = (id) => {
    
    const productoExiste = carrito.some(producto => producto.id === id)
    if(productoExiste){
      carrito.map(prod => {
        if(prod.id === id){
          prod.cantidad++
        }
      })
    }
    else{
      const producto = sylvanian.find((producto) => producto.id === id);
      carrito.push(producto);
      Swal.fire({
        title: producto.title,
        position: 'center',
        icon: 'success',
        imageUrl: producto.img,
        imageWidth: 200,
        imageHeight: 200,
        title: 'Añadido al carrito!',
        showConfirmButton: false,
        timer: 1500
      })
     }

    }

    //funcion carrito

  function mostrarCarrito() {
        const modalBody = document.querySelector(".modal .modal-body");
        modalBody.innerHTML = ` `;
        carrito.forEach((prod) => {
          modalBody.innerHTML += ` 
      <div class="modal-contenedor"> 
      <div>
      <img class "img-fluid img-carrito" id="imagenesxd" src="${prod.img}"/>
      </div>
      <div> 
      <p>Producto: ${prod.title}</p>
      <p>Precio: ${prod.price} $</p>
      <p>Piezas:${prod.pieces}</p>
      <p>Cantidad: ${prod.cantidad}</p>
      <button class="eliminar-prod" id="eliminar${prod.id}">Eliminar producto</button>
      </div>
      </div>
      `;
          tituloPrecio.innerHTML = `<b> ${precioTotal}</b>`;
        });

        //funcion mensaje carrito 
        if (carrito.length === 0) {
          modalBody.innerHTML = `
          <p class="text-center text-secondary parrafo">¡Aun no agregaste nada!</p>
          `;
        } else {
          console.log("Hay productos en el carrito");
        }
        carritoContenedor.textContent = carrito.length;

        //

        // carrito.forEach(() => {});
        let sumaTotal = document.getElementById("precioTotal");
        let totalAPagar = carrito.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);
        sumaTotal.innerText= ` ${totalAPagar} $`;
         localStorage.setItem("carrito",JSON.stringify(carrito));
        // let precioTotal = document.getElementById("precio-total");
        // const totalAPagar = carrito.reduce((acc,prod)=> acc + prod.price * prod.cantidad, 0);
        // precioTotal.innerText = `Precio total: ${totalAPagar} $ `;
        carrito.forEach(prod => {
          document.getElementById(`eliminar${prod.id}`).addEventListener("click", () => {
            eliminarDelCarrito(prod.id);
          });
        });
      }
function eliminarDelCarrito(id){
    
    let prodId = id;
    const prodExistente = carrito.some(producto => producto.id === prodId)
    if(prodExistente){
      carrito.map(prod => {
        if (prod.id === id){
          if(prod.cantidad > 1){
            prod.cantidad--
          }
          else if(prod.cantidad === 1){
            carrito = carrito.filter((producto) => producto.id !== prodId)
          }
        }
      })
    }
    else{
      carrito = carrito.filter((producto) => producto.id !== prodId)
    }
    mostrarCarrito();
    guardarStorage();
  }

  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
});


// aca intente hacer un formulario pero no llegue con el tiempo, lo deje porque pienso actulizarlo y añadirlo
//aclaro para no prestarle atencion a esto ni al COMPRA.HTML porque no esta listo aun!
function procesarCompra (){

  carrito.forEach((prod) => {
const listaCompra = document.querySelector ('#lista-compra tbody')
const{img, id, title, cantidad, price,  pieces} = prod

if (listaCompra) {
  const row = document.createElement("tr");
  row.innerHTML += `
          <td>
          <img class="img-fluid img-carrito" src="${img}"/>
          </td>
          <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>${precio * cantidad}</td>
        `;
  listaCompra.appendChild(row);
}
});

  } 
  

