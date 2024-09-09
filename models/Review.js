import Sequelize from 'sequelize';
import db from '../config/db.js';

const Review = db.define('testimoniales', {
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false // Disable timestamps
});

export default Review;