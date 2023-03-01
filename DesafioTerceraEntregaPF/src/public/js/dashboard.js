const divProducts = document.querySelector("#products");
// const userCart = document.getElementById('userCart');
divProducts.addEventListener("click", async (event) => {
    if (event.target.classList.contains("addcart_button")) {
        const id = event.target.dataset.id;
        // alert("added to cart: "+id);
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
            getCantProductsCart(userCart.value);
        } else {
            swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
        // console.log(data);
    }
});