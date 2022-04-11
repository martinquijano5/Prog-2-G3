let data = {
    usuario: {
        email: 'tutequijano@gmail.com',
        usuario: 'mquijano',
        contrasenia: 'callefalsa1234',
        fecha: '2002-11-05',//guardamos la fecha en el formato yy/mm/dd para que funcione el auto completado
        dni: 44486189,
        foto: '/images/users/default-image.png'
    },
    productos: [
        {
            modelo: 'iPhone 13 Pro',
            marca: 'Apple',
            anio: 2021,
            color: 'azul sierra',
            memoria: 64,
            tamanio: 6.1,
        }, {
            modelo: 'iPhone 13 Pro Max',
            marca: 'Apple',
            anio: 2021,
            color: 'grafito',
            memoria: 512,
            tamanio: 6.7,
        }, {
            modelo: 'Galaxy S22 Ultra',
            marca: 'Samsung',
            anio: 2022,
            color: 'burgundy',
            memoria: 256,
            tamanio: 6.8,
        }, {
            modelo: 'iPhone 11',
            marca: 'Apple',
            anio: 2019,
            color: 'rojo',
            memoria: 128,
            tamanio: 6.1,
        }, {
            modelo: 'Moto G60s',
            marca: 'motorola',
            anio: 2021,
            color: 'azul',
            memoria: 128,
            tamanio: 6.78,
        }, {
            modelo: 'Galaxy Note 8',
            marca: 'Samsung',
            anio: 2017,
            color: 'negro',
            memoria: 256,
            tamanio: 6.3,
        }, {
            modelo: 'Galaxy Note 3',
            marca: 'Samsung',
            anio: 2013,
            color: 'blanco',
            memoria: 64,
            tamanio: 5.7,
        }, {
            modelo: 'Galaxy S21 +',
            marca: 'Samsung',
            anio: 2021,
            color: 'negro',
            memoria: 128,
            tamanio: 6.7,
        }, {
            modelo: 'iPhone SE',
            marca: 'Apple',
            anio: 2016,
            color: 'rose gold',
            memoria: 16,
            tamanio: 4,
        }, {
            modelo: 'V30',
            marca: 'LG',
            anio: 2017,
            color: 'violeta',
            memoria: 64,
            tamanio: 6,
        }
    ],
    comentarios: [
        {
            nombre: 'John Doe',
            texto: 'Me gusto',
            rating: 5,
            imagen: './images/users/default-image.png'
        },
        {
            nombre: 'Everyman',
            texto: 'Meh',
            rating: 2,
            imagen: './images/users/default-image.png'
        },
        {
            nombre: 'John Smith',
            texto: 'Lo recomiendo',
            rating: 4,
            imagen: './images/users/default-image.png'
        },
        {
            nombre: 'Richard Roe',
            texto: 'Cumple lo que promete',
            rating: 4,
            imagen: './images/users/default-image.png'
        },
        {
            nombre: 'Jane Doe',
            texto: 'Medio caro por lo que ofrece',
            rating: 3,
            imagen: './images/users/default-image.png'
        },
        {
            nombre: 'Joe Sixpack',
            texto: 'Se lo compre a mi pibe y anda todo el dia usandolo',
            rating: 4,
            imagen: './images/users/default-image.png'
        },
        {
            nombre: 'Mr Brown',
            texto: 'Muy malo',
            rating: 1,
            imagen: './images/users/default-image.png'
        },
        {
            nombre: 'Joe Blow',
            texto: 'No se si me gusta o no',
            rating: 3,
            imagen: './images/users/default-image.png'
        },
        {
            nombre: 'Mr. Nobody',
            texto: 'Esta bueno, medio caro pero cumple',
            rating: 3,
            imagen: './images/users/default-image.png'
        },
        {
            nombre: 'Ordinary Joe',
            texto: 'La camara medio mala por lo que vale',
            rating: 2,
            imagen: './images/users/default-image.png'
        },

    ]
}

module.exports = data;