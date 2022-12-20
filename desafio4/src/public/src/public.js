const form = document.querySelector('#formulario');
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
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProducto)
        }
        const result = await fetch('/api/productos', options);
        const data = await result.json();
        Swal.fire(
            'Producto guardado',
            `El producto con el id ${data.id} ha sido guardado con éxito`,
            'success'
        );
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

