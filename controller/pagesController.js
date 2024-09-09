import Viaje from '../models/Viaje.js';
import Review from '../models/Review.js';

const paginaInicio = async (req, res) => {
    // Consultar 3 viajes del modelo Viaje
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Review.findAll({ limit: 3 }));

    try {
        const resultado = await Promise.all(promiseDB);    
        /* Optimizar promise para que no tenga que esperar a que se resulevan ambas promesas 
        const viajes = await Viaje.findAll({ limit: 3 });
        const reviews = await Review.findAll({ limit: 3 });
        */

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            reviews: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaViajes = async (req, res) => {
    // Consultar BD
    const viajes = await Viaje.findAll();
    //console.log(viajes);
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaAbout = (req, res) => {
    res.render('nosotros', {
        pagina: 'Sobre Nosotros'
    });
}

const paginaReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.render('reviews', {
            pagina: 'Reviews',
            reviews
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaDetalleDestino = async (req, res) => {
    const { slug } = req.params;
    try {
        const destino = await Viaje.findOne({ where: { slug } });
        res.render('destino', {
            pagina: 'Información Viaje',
            destino
        });
    } catch (error) {
        console.log(error);
    }
}

const saveReview = async (req, res) => {
    const { name, email, message } = req.body;
    let errores = [];
    if (!name) {
        errores.push({ message: 'Agrega tu Nombre' });
    }
    if (!email) {
        errores.push({ message: 'Agrega tu Email' });
    }
    if (!message) {
        errores.push({ message: 'Agrega tu Mensaje' });
    }

    if (errores.length > 0) {
        // Si hay reviews:
        const reviews = await Review.findAll();

        // Muestra la vista con errores
        res.render('reviews', {
            pagina: 'Reviews',
            errores,
            name,
            email,
            message,
            reviews
        });
    } else {
        // Almacenar en BD
        try {
            console.log('' + name + ' ' + email + ' ' + message);
            console.log(Review);
            await Review.create({
                nombre: name,
                correo: email,
                mensaje: message
            });

            res.redirect('/reviews');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    paginaInicio,
    paginaViajes,
    paginaAbout,
    paginaReviews,
    paginaDetalleDestino,
    saveReview
}