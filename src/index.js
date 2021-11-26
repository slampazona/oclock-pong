/*
 * Package Import
 */
import express from 'express';
import cors from 'cors';
import path from 'path';

// Express
const app = express();
// CORS
// API : https://github.com/expressjs/cors#configuration-options
app.use(
    cors({
        origin: true, // Pour accepter n'importe quelle origine
    }),
);

app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, '..', 'front-react', 'dist'));
app.use(
  express.static(path.join(__dirname, '..', 'front-react', 'dist')),
);

/*
 * Export
 */
export default app;
