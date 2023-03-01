const cleave = new Cleave('.input-element', {
    phone: true,
    phoneRegionCode: 'ar'
});

document.addEventListener('DOMContentLoaded', function() {
    const formSignup = document.getElementById("formSignUp");
    const btnSingup = document.getElementById("btnSingup");
    
    formSignup.addEventListener('submit', async (e) => {
        e.preventDefault();
        btnSingup.disabled = true;
        const htmlBtnLoading = `
        <span class="mr-1">Registrando&nbsp;</span>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        `;
        btnSingup.innerHTML = htmlBtnLoading;

        const form = new FormData(e.target);
        const response = await fetch(`/api/user/signUp`, {
          method: "POST",
          body: form,
        });
        const result = await response.json();
        const divError = document.getElementById("errMsg");
        if(result.status === 'error') {
            divError.innerHTML = "";
            result.message.forEach(element => {
                divError.innerHTML += `<p class="m-0">${element}</p>`;
            });
            divError.className = "alert alert-danger py-3";
            btnSingup.innerHTML = "Registrarse";
            btnSingup.disabled = false;
            // scroll to top
            window.scrollTo(0, 0);
            setTimeout(() => {
                divError.innerHTML = "";
                divError.className = "";
            }, 4000);
        }
        else {
            divError.innerHTML = "";
            divError.className = "";
            window.location.href = "/login";
        }
        // console.log(result);
    });
});