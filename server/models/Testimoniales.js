const Sequelize = require('sequelize');
const database = require('../config/database');

const Testimonial = database.define('testimoniales', {
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }
});

module.exports = Testimonial;