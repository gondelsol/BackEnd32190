const form = document.querySelector('#productForm');
const tableProducts = document.querySelector('#tableProducts tbody');
const btnCancel = document.querySelector('#btn-cancel');

// Funciones
const cancelForm = () => {
    form.reset();
    document.querySelector('#formTitle').innerHTML = 'Ingrese un producto';
    form.querySelector('#btn-save').innerText = 'Agregar producto';
    form.querySelector('#btn-cancel').classList.add('d-none');
}

const renderProduct = async (data, edited = false) => {
    const template = await fetch('/templates/product.hbs');
    const textTemplate = await template.text();
    const functionTemplate = Handlebars.compile(textTemplate);
    const html = functionTemplate(data);
    if(edited) {
        document.querySelector(`[data-tr-id="${data.id}"]`).innerHTML = html;
    }
    else {
        tableProducts.innerHTML += html;
    }
}

const saveNew = async (formData) => {
    const newProducto = {
        name: formData.get('name'),
        description: formData.get('description'),
        code: formData.get('code'),
        price: formData.get('price'),
        stock: formData.get('stock'),
        image: formData.get('image')
    };
    // console.log(newProducto);
    try {
        const product = await fetch('/api/product', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProducto)
        });
        const data = await product.json();
        // console.log(data);
        Swal.fire(
            'Producto guardado',
            `El producto ha sido agregado con éxito`,
            'success'
        );
        newProducto.id = data.data.id;
        renderProduct(newProducto);
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
}
const saveEdited = async(formData) => {
    const id = formData.get('id');
    const newProducto = {
        name: formData.get('name'),
        description: formData.get('description'),
        code: formData.get('code'),
        price: formData.get('price'),
        stock: formData.get('stock'),
        image: formData.get('image')
    };
    try {
        const product = await fetch(`/api/product/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProducto)
        });
        const data = await product.json();
        // console.log(data);
        Swal.fire(
            'Producto guardado',
            `El producto ha sido modificado con éxito`,
            'success'
        );
        newProducto.id = data.data.id;
        renderProduct(newProducto, true);
        form.reset();
    }
    catch (error) {
        Swal.fire(
            'Ha ocurrido un error',
            `El producto no ha sido modificado: ${error.message}`,
            'error'
        );
        console.warn(error);
    }
}

// acciones de los botones de la tabla
tableProducts.addEventListener('click', async (e) => {
    const btnEdit = e.target.closest('.btn-edit');
    const btnDelete = e.target.closest('.btn-delete');
    if(btnEdit) {
        const id = btnEdit.dataset.id;
        const product = await fetch(`/api/product/${id}`);
        const data = await product.json();
        // console.log(data);
        // const form = document.querySelector('#productForm');
        form.querySelector('#id').value = data.id;
        form.querySelector('#name').value = data.name;
        form.querySelector('#description').value = data.description;
        form.querySelector('#price').value = data.price;
        form.querySelector('#stock').value = data.stock;
        form.querySelector('#code').value = data.code;
        form.querySelector('#image').value = data.image;
        document.querySelector('#formTitle').innerHTML = 'Editar producto';
        form.querySelector('#btn-save').innerText = 'Editar';
        form.querySelector('#btn-cancel').classList.remove('d-none');
    }
    if(btnDelete) {
        const id = btnDelete.dataset.id;
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.value) {
                const product = await fetch(`/api/product/${id}`, {
                    method: 'DELETE'
                });
                const data = await product.json();

                if(data.deleted) {
                    Swal.fire(
                        'Producto eliminado',
                        `El producto ha sido eliminado con éxito`,
                        'success'
                    );
                    const trDeleted = document.querySelector(`[data-tr-id="${id}"]`);
                    trDeleted.remove();
                }
                else {
                    Swal.fire(
                        'Ha ocurrido un error',
                        `El producto no ha sido eliminado: ${data.message}`,
                        'error'
                    );
                }
            }
        })
    }
});

// Eventos
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const id = formData.get('id');
    if(id == ''){
        saveNew(formData);
    }
    else {
        saveEdited(formData);
    }
});

btnCancel.addEventListener('click', (e) => {
    e.preventDefault();
    cancelForm();
})