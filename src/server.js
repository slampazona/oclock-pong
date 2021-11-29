/*
 * Package Import
 */
import 'dotenv-flow/config';
// import des models pour la synchro de la BDD, ne pas toucher même si pas utilisé
import models from './models';
import logger from 'src/utils/logger';
/*
 * Local Import
 */
import bdd from './bdd';
import app from './index';
/*
 * Server • Node.js
 */
const port = process.env.SERVER_PORT;
if (!port) {
    logger.warning(
        "ヽ༼ ಠ益ಠ ༽ﾉ  Il y a un problème avec la variable d'env SERVER_PORT",
    );
}

async function initServer() {
    try {
        try {
            await bdd.authenticate();
            logger.log('sql', '✔️ BDD connectée avec succès');
        } catch (error) {
            logger.log('sql', '❌ Erreur de connexion à la BDD');
            throw error;
        }
        try {
            await bdd.sync();
            logger.log('sql', '✔️ Modèles synchronisés en BDD avec succès');
        } catch (error) {
            logger.log('sql', '❌ Erreur de synchronisation des modèles à la BDD');
            throw error;
        }
        return app.listen(port, () => {
            logger.info('🤖  Node.js is running :');
            logger.info(`→ PORT *:${port}`);
            logger.info(`→ ENV : ${process.env.NODE_ENV}`);
        });
    }
    catch (error) {
        logger.log('sql', '❌ Erreur au lancement du serveur ' + error.message);
    }
}

export default initServer();