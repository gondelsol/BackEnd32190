const generaRandoms = (cant) => {
    maximo = 1000;
    // genero un arreglo de 1000 con ceros
    const numRandoms = Array(maximo + 1).fill(0);

    for (let i = 0; i < cant; i++) {
        const x = Math.floor(Math.random() * maximo) + 1; // genero el numero aleatorio
        numRandoms[x] = numRandoms[x] + 1; // voy contando las apariciones
    }
    delete numRandoms["0"]; // elilmino el primer elemeno, no es necesario

    return { ...numRandoms }; // paso a objetos y lo devuelvo
};

process.on("message", (cant) => {
    const result = generaRandoms(cant);
    process.send(result);
});