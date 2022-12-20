const socket = io();
const form = document.querySelector('#formulario');
const formChat = document.querySelector('#formMessages');

const renderProductos = async (data) => {
    const template = await fetch('/plantilla/tabla.hbs');
    const textTemplate = await template.text();
	const functionTemplate = Handlebars.compile(textTemplate);
	const html = functionTemplate({ productos: data });
	document.querySelector('#productos').innerHTML = html;
}

const renderChat = async (data) => {
    const template = await fetch('/plantilla/messages.hbs');
    const textTemplate = await template.text();
	const functionTemplate = Handlebars.compile(textTemplate);
	const html = functionTemplate({ productos: data });
	document.querySelector('#messages').innerHTML = html;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const newProducto = {
        title: formData.get('title'),
        price: formData.get('price'),
        thumbnail: formData.get('thumbnail')
    };
    console.log(newProducto);
    try {
        socket.emit('new-producto', newProducto);
        Swal.fire(
            'Producto guardado',
            `El producto ha sido agregado con éxito`,
            'success'
        );
        form.reset();
    }
    catch (error) {
        Swal.fire(
            'Ha ocurrido un error',
            `El producto no ha sido guardado: ${error.message}`,
            'error'
        );
        console.warn(error);
    }
});
formChat.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(formChat);
    const newProducto = {
        email: formData.get('email'),
        message: formData.get('message'),
        dateTime: new Date().toLocaleString("es-AR"),
    };
    console.log(newProducto);
    try {
        socket.emit('new-message', newProducto);
        document.querySelector("#message").value = '';
    }
    catch (error) {
        Swal.fire(
            'Ha ocurrido un error',
            `El producto no ha sido guardado: ${error.message}`,
            'error'
        );
        console.warn(error);
    }
});

// Cliente
socket.on('productos', data => { renderProductos(data); });
socket.on('messages', data => { renderChat(data); });