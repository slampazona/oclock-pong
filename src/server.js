/*
 * Package Import
 */
import 'dotenv-flow/config';

import { testAndSyncDB } from './utils/migrateDB';
import logger from 'src/utils/logger';
/*
 * Local Import
 */
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
        await testAndSyncDB();
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