import express from 'express';
import path from 'path';
import apiRoutes from './api';

const router = express.Router();

// Toutes les routes concernant l'api
router.use('/api', apiRoutes);

router.use((_, res) => {
    // Dans tous les cas, si on a pas trouvé route à son pied, on redirige vers l'app en react
    // c'est elle qui gèrera la 404
    res.sendFile(path.join(__dirname, '..', '..', 'front-react', 'dist', 'index.html'))
})

export default router;