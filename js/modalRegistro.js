const contenedorModalNewsletter = document.getElementsByClassName('modalNewsletter-contenedor')[0]
const botonAbrirNewsletter = document.getElementById('boton-newsletter')
const botonCerrarNewsletter = document.getElementById('btnNewsletterCerrar')
const modalNewsletter = document.getElementsByClassName('modal-newsletter')[0]

// LOGGING
const formulario = document.querySelector('#my-form')

const inputNombre = document.querySelector ('#input-nombre')

const inputEmail = document.querySelector ('#input-email')

const btnListo = document.querySelector ('#btn-listo')
// FIN LOGGING


// Boton Abrir modal Newsletter
botonAbrirNewsletter.addEventListener('click', ()=>{
    contenedorModalNewsletter.classList.toggle('modal-active')
})
// Fin Abrir modal Newsletter

// Boton Cerrar modal Newsletter
botonCerrarNewsletter.addEventListener('click', () => {
    contenedorModalNewsletter.classList.toggle('modal-active')
})
contenedorModalNewsletter.addEventListener('click', () => {
    botonCerrarNewsletter.click()
})
// Fin Cerrar modal Newsletter

modalNewsletter.addEventListener('click', (event)=>{
    event.stopPropagation()
})

btnListo.addEventListener ('click', () => {
    console.log (inputNombre.value)
    console.log (inputEmail.value)

    localStorage.setItem('user', inputNombre.value)    
})

inputNombre.addEventListener ('change', () => {
    // console.log(inputNombre.value)

    if (inputNombre.value.length < 4) {
        inputNombre.classList.add('border-danger')
        inputNombre.classList.remove('border-success')
    } else {
        inputNombre.classList.add('border-success')
        inputNombre.classList.remove('border-danger')
    }
    // inputNombre.value.lenght < 4 ? inputNombre.classList.add('border-danger') : inputNombre.classList.remove('border-success') ?????
})

inputEmail.addEventListener ('change', () => {
    // console.log(inputEmail.value)

    if (inputEmail.value.length <= 8) {
        inputEmail.classList.add('border-danger')
        inputEmail.classList.remove('border-success')
    } else {
        inputEmail.classList.add('border-success')
        inputEmail.classList.remove('border-danger')
    }
})

formulario.addEventListener ('submit', (e) => {
    e.preventDefault()

    console.log("Usuario registrado!")
    // console.log(inputNombre.value)
    // console.log(inputEmail.value)
})

// // FIN LOGGING