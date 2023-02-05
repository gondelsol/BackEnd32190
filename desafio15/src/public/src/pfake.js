const form = document.querySelector('#formularioFake');

const renderProductos = async (data) => {
    const template = await fetch('/plantilla/tabla.hbs');
    const textTemplate = await template.text();
	const functionTemplate = Handlebars.compile(textTemplate);
	const html = functionTemplate({ productos: data });
	document.querySelector('#productosFake').innerHTML = html;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('#productosFake').innerHTML = `
    <div class="col-md-6 offset-md-3 text-center">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Cargando...</span>
        </div>
    </div>
    `;

    const data = await fetch('/api/productos-test');
    const dataJson = await data.json();
    await renderProductos(dataJson);
});