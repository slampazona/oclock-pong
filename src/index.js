/*
 * Package Import
 */
import express from 'express';
import cors from 'cors';
import path from 'path';
import swaggerConfig from '../swagger-config.json';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi  from 'swagger-ui-express';
import { developmentErrors, productionErrors } from 'src/middlewares/errorHandlers';
import router from 'src/routes';
// Express
const app = express();
// CORS
// API : https://github.com/expressjs/cors#configuration-options
app.use(
  cors({
    origin: true, // Pour accepter n'importe quelle origine
  }),
);


const specs = swaggerJsdoc(swaggerConfig);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true})
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.static(path.join(__dirname, '..', 'front-react', 'dist'), {
    index: false
  }),
);

app.use(router);

// Gestion de l'affichage des erreurs
app.use(process.env.NODE_ENV === 'development' ? developmentErrors : productionErrors);

/*
 * Export
 */
export default app;
