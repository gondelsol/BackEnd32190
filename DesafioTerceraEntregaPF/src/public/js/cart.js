const userCart = document.getElementById('userCart');
const labelCant = document.getElementById('cantCart');
const btnCheckout = document.querySelector('.btnCheckout button');
const fullpageLoader = document.querySelector('.fullpage-loader');

// Handlebars.registerHelper("multiply", function (multiplicand, multiplier) {
//     return multiplicand * multiplier;
// });

const getCantProductsCart = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    }
    // console.log(id);
    const res = await fetch(`/api/cart/${id}/products/count`, options);
    const data = await res.json();
    // console.log(data);
    let cant = 0;
    if(data.success) {
        cant = data.cant;
    }
    else {
        console.warn(data.message);
    }
    labelCant.innerHTML = cant;
    // return cant;
}

if(btnCheckout){
    // Eventos
    btnCheckout.addEventListener('click', async (e) => {
        e.preventDefault();
        const id = userCart.value;
        Swal.fire({
            title: '¿Desea procesar el pedido?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.value) {
                fullpageLoader.classList.remove('d-none');
                fullpageLoader.classList.remove('fullpage-loader--invisible');
                const res = await fetch(`/api/cart/${id}/checkout`);
                const data = await res.json();
                if(data.success) {
                    location.href = '/orden-enviada'
                }
                else {
                    Swal.fire(
                        'Ha ocurrido un error',
                        `El producto no ha sido eliminado: ${data.message}`,
                        'error'
                    );
                    fullpageLoader.classList.add('fullpage-loader--invisible');
                    fullpageLoader.classList.add('d-none');
                }
                // console.log(data);
            }
        });
    });
}

getCantProductsCart(userCart.value);