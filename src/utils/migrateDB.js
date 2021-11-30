// import des models pour la synchro de la BDD, ne pas toucher même si pas utilisé
import { Score } from 'src/models';
import logger from 'src/utils/logger';
import { getRandomInt } from 'src/utils';

import bdd from 'src/bdd';
/* istanbul ignore next */
export const testAndSyncDB = async () => {
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
}
/* istanbul ignore next */
export const syncAndMigrateDBForTests = () => {
    if (process.env.NODE_ENV !== 'test') return Promise.reject(`C'est pas le bon environnement`);
    return bdd.sync({
        force: true,
    }).then(async () => {
        const promises = [];
        for (let i = 0; i < 3; i++) {
            promises.push(Score.create({
                pseudo: `pseudo_${i}`,
                player_1: getRandomInt(1, 10),
                player_2: getRandomInt(1, 10),
                score_date: new Date(),
            }));
        }
        return Promise.all(promises);
    });
}