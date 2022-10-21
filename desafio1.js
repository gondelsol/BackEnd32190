const libro001 = {
    nombreLibro: 'A tale of two cities',
    autorLibro: 'Charles Dickens',
    anioLibro: 1859
};

const libro002 = {
    nombreLibro: 'Count Dracula',
    autorLibro: 'Bram Stoker',
    anioLibro: 1897
};

const libro003 = {
    nombreLibro: 'Romeo and Juliet',
    autorLibro: 'William Shakespeare',
    anioLibro: 1597
};

const nuevoLibro = {
    nombreLibro: 'Martín Fierro',
    autorLibro: 'José Hernandez',
    anioLibro: 1872
}


class Usuario {
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor});
    }
    getBookNames(){
        return this.libros.map(libro => libro.nombre);
    }
    countLibros () {
        return this.libros.length;
    }
}

const usuario = new Usuario("Joaquin", "Gonzalez del Solar");
console.log(usuario.getFullName());

usuario.addMascota("Perro");
usuario.addMascota("Gato");
usuario.addMascota("Gatito");
usuario.addMascota("Raton");

console.log("la cantidad de mascotas es: " , usuario.countMascotas());

usuario.addBook(libro001);
usuario.addBook(libro002);
usuario.addBook(libro003);
console.log("El nuevo libro es", nuevoLibro)
usuario.addBook(nuevoLibro);
console.log("la cantidad de libros es: " , usuario.countLibros());
console.log("La nueva colección es: ")
usuario.getBookNames(usuario);
console.log(usuario.getBookNames()); //muestras la lista de archivos por pantalla