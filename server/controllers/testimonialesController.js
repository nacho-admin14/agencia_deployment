const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    })
}

exports.agregarTestimonial = async (req, res) => {
    //Validar que los campos esten llenos
    const {nombre, correo, mensaje} = req.body;

    let errores = [];
    if(!nombre){
        errores.push({'mensaje' : 'Agregar tu Nombre'});
    }
    if(!correo){
        errores.push({'mensaje' : 'Agregar tu Correo'});
    }
    if(!mensaje){
        errores.push({'mensaje' : 'Agregar tu Mensaje'});
    }

    //Revisar por errores
    if(errores.length > 0){
        //Muestra la vista de errores
        const testimoniales = await testimonial.findAll()
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales
        })
    }else{
        //Almacenar en la BD
        Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        .then(testimonial => res.redirect('/testimoniales'))
        .catch(error => console.log(error));
    }
}