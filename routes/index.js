import express from 'express';
import { paginaInicio, paginaViajes, paginaAbout, paginaReviews, 
    paginaDetalleDestino,
    saveReview
 } from '../controller/pagesController.js';

const router = express.Router();

// Define routes
router.get('/', paginaInicio);    

router.get('/viajes', paginaViajes);    

router.get('/about', paginaAbout);    

router.get('/reviews', paginaReviews);    
router.post('/reviews', saveReview);

router.get('/viajes/:slug', paginaDetalleDestino);    

export default router;