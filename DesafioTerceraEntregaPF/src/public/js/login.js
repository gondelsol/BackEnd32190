document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById("formLogin");
    const btnLogin = document.getElementById("btnEnviar");

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        btnLogin.disabled = true;
        const htmlBtnLoading = `
        <span class="mr-1">Iniciando&nbsp;</span>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        `;
        btnLogin.innerHTML = htmlBtnLoading;
        const form = new FormData(formLogin);
        const data = {
            username: form.get('username'),
            password: form.get('password')
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        // console.log(data);
        const response = await fetch(`/api/user/login`, options);
        const result = await response.json();
        const divError = document.getElementById("errMsg");
        if(result.status === 'error') {
            divError.innerHTML = "";
            result.message.forEach(element => {
                divError.innerHTML += `<p class="m-0">${element}</p>`;                
            });
            divError.className = "alert alert-danger py-3";
            btnLogin.innerHTML = "Iniciar sesión";
            btnLogin.disabled = false;
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
            window.location.href = "/dashboard";
        }
    });
});