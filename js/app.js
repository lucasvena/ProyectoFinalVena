// == selectores ==

const productosContainer = document.querySelector('#contenedor-productos')

const carritoContenedor = document.querySelector('#carrito-contenedor')

const contadorCarrito = document.querySelector('#contadorCarrito')

const precioTotal = document.querySelector('#precioTotal')

const botonVaciar = document.getElementById('vaciarCarrito')

// CHEQUEO ESTADO DEL CARRITO EN LS

const carrito = JSON.parse(localStorage.getItem('carrito')) || []

let stock = []

// CARDS DE PRODUCTOS EN EL DOM CON FETCH
fetch('./stock.json')
    .then((resp) => resp.json())
    .then((data) => {
        stock = data

        stock.forEach ( (producto) => {
            const div = document.createElement('div')
            div.classList.add('producto') 
        
            div.innerHTML = `
                            <img src=${producto.img}/>
                            <h4>${producto.tipo}</h4>
                            <p>${producto.desc}</p>
                            <p>Precio: $ ${producto.precio}</p>
                            <p>Disponible: ${producto.stock} en stock</p>
                            <button onclick="agregarAlCarrito(${producto.id})" class="boton-agregar"><i class="fas fa-shopping-cart"> + </i></button>
                            `
        
            productosContainer.append(div) //Hago que se vean esos div en contenedor-productos en el html
        })
    })


// AGREGAR LOS PRODUCTOS AL CARRITO
const agregarAlCarrito = (productoId) => {
    
    const itemInCart = carrito.find((producto) => producto.id === productoId)

    if (itemInCart) {
        itemInCart.cantidad++
        showMensaje(itemInCart.tipo)
    } else {
        const item = stock.find( (producto) => producto.id === productoId)
        const {id, tipo, precio} = item
        const itemToCart = {
        id, tipo, precio, cantidad: 1
        }
        carrito.push(itemToCart)
        showMensaje(tipo)
    }

    localStorage.setItem('carrito', JSON.stringify (carrito))

    console.log(carrito)
    renderCarrito()
    renderCantidad()
    renderTotal()
}

// ELIMINAR LOS ITEMS DEL CARITO 1x1
const removerDelCarrito = (id) => {
    const item = carrito.find((producto) => producto.id === id)
    item.cantidad--

    if (item.cantidad === 0) {
        const indice = carrito.indexOf(item)
        carrito.splice(indice, 1)
    }

    Toastify({
        text: 'Producto eliminado',
        position: 'left',
        gravity: 'bottom',
        duration: 5000,
        style: {
            background: "linear-gradient(to right, #eb6a37, #e23721)",
        }
    }).showToast()      
    
    localStorage.setItem('carrito', JSON.stringify (carrito))

    renderCarrito()
    renderCantidad()
    renderTotal()
}

// ELIMINAR TODOS LOS PRODUCTOS DE UNA VEZ
const vaciarCarrito = () => {
    carrito.length = 0
    localStorage.setItem('carrito', JSON.stringify (carrito))



    renderCarrito()
    renderCantidad()
    renderTotal()
}

botonVaciar.addEventListener('click', () =>{
    Swal.fire({
        title: 'WOW! Estás seguro?',
        text: "Estás a punto de vaciar el carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar!',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        
        if (result.isConfirmed) {
            vaciarCarrito()
            botonCerrar.click()
            Toastify({
                text: 'Se vació el carrito',
                position: 'left',
                gravity: 'bottom',
                duration: 5000,
                style: {
                    background: "linear-gradient(to right, #eb6a37, #e23721)",
                }
            }).showToast()          
        }
    })
})

// FUNCIONES
// COMO SE VERÁN LOS PRODUCTOS EN CARRITO
const renderCarrito = () => {
    carritoContenedor.innerHTML = '' // al llamar, vacío el contenedor para que no se acumulen los productos 

    carrito.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')

        div.innerHTML = `
                    <p>${producto.tipo}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <p>Precio: $${producto.precio}</p>
                    <button onclick="removerDelCarrito(${producto.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                    `
        
        carritoContenedor.append(div)
    })
}

// NUMERITO DEL CARRITO
const renderCantidad = () => {
    contadorCarrito.innerText = carrito.reduce((acc,prod) => acc + prod.cantidad,0)
}

// SUMA PRECIO DE LOS PRODUCTOS
const renderTotal = () => {
    let total = 0
    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad
    })

    precioTotal.innerText = total
}

// MENSAJITO PRODUCTO SUMADO (TOASTIFY)
const showMensaje = (producto) => {
    Toastify({
        text:`Se agregó ${producto} al carrito!`,
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast()
}

renderCarrito()
renderCantidad()
renderTotal()
// FIN FUNCIONES
