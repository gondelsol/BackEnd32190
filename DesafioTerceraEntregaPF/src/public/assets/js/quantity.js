/**=====================
    Quantity js
==========================**/
const calcTotalCart = function () {
    let total = 0;
    $(".priceCart").each(function () {
        // const id = $(this).data("id");
        const price = $(this).data("price");
        const cant = $(this).next().children().find('.qty-input').val();
        const totalRow = $(this).next().next().find('.total');
        totalRow.html(`$${price*cant}`);
        // console.log(id, price, cant);
        total += price*cant;
    });
    if(total == 0) {
        $(".btnCheckout").hide();
    }
    $(".totalCart, .subtotalCart").html(`$${total}`);
    return 1;
}
$('.qty-right-plus').click( async function () {
    const id = $(this).attr('data-id');
    console.log(id);
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            products: [{id}]
        })
    }
    const res = await fetch(`/api/cart/${userCart.value}/products`, options);
    const data = await res.json();
    if(data.success) {
        swal.fire({
            title: 'Producto agregado',
            text: 'Producto agregado al carrito',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        $(this).prev().val(+$(this).prev().val() + 1);
        calcTotalCart();
        // getCantProductsCart(userCart.value);
    } else {
        swal.fire({
            title: 'Error',
            text: data.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }

    // console.log(id);
    // if ($(this).prev().val() < 9) {
    //     $(this).prev().val(+$(this).prev().val() + 1);
    // }
});
$('.qty-left-minus').click(async function () {
    const id = $(this).attr('data-id');
    const options = {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const res = await fetch(`/api/cart/${userCart.value}/products/${id}/one`, options);
    const data = await res.json();
    if(data.success) {
        swal.fire({
            title: 'Producto eliminado',
            text: 'Producto eliminado carrito',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        if ($(this).next().val() > 1) {
            $(this).next().val(+$(this).next().val() - 1);
        }
        else {
            $(`[data-tr-id="${id}"]`).remove();
            getCantProductsCart(userCart.value);
        }
        calcTotalCart();
    } else {
        swal.fire({
            title: 'Error',
            text: data.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
        

    // if ($(this).next().val() > 1) {
    //     if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
    // }
});
$('.btn-delete').click(async function () {
    const id = $(this).attr('data-id');
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
            const options = {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            const res = await fetch(`/api/cart/${userCart.value}/products/${id}/`, options);
            const data = await res.json();
            if(data.success) {
                swal.fire({
                    title: 'Producto eliminado',
                    text: 'Producto eliminado carrito',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                $(`[data-tr-id="${id}"]`).remove();
                getCantProductsCart(userCart.value);
                calcTotalCart();
            } else {
                swal.fire({
                    title: 'Error',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    });        

    // if ($(this).next().val() > 1) {
    //     if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
    // }
});