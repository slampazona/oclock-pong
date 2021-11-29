/*
 * Package Import
 */
import status from 'http-status';
import { BaseError } from 'sequelize';
import logger from 'src/utils/logger';
/*
 * Development Error Handler
 *
 * Donne l'erreur en détail, peut importe l'erreur
 */
export const developmentErrors = (err, req, res, next) => {
    const errStack = err.stack || '';

    const errorDetails = {
        ...err,
        message: err.message,
        status: err.status || status.INTERNAL_SERVER_ERROR,
        stackHighlighted: errStack.replace(
            /[a-z_-\d]+.js:\d+:\d+/gi,
            '<mark>$&</mark>',
        ),
    };
    logger.error(err.message, err.stack);
    res.status(errorDetails.status).send(errorDetails);
};

/*
 * Production Error Handler
 *
 * Donne l'erreur mais sans le détail, peut importe l'erreur
 */
export const productionErrors = (err, req, res, next) => {
    let errorMessage = err.message;
    if (err instanceof BaseError){
        errorMessage = "Une erreur est survenue avec la base de données, merci de réessayer plus tard ... Ou pas !."
    }
    else if (err.classname === 'Error'){
        errorMessage = 'Une erreur est survenue, merci de réessayer plus tard ... Ou pas !.'
    }
    const errorDetails = {
        message: errorMessage,
        status: err.status || status.INTERNAL_SERVER_ERROR,
    };
    logger.error(err.message, err.stack);
    res.status(errorDetails.status).send(errorDetails);
};
