/*
 * Package Import
 */
import { Sequelize } from 'sequelize';
import logger from 'src/utils/logger';

/*
 * Local Import
 */

/*
 * Init
 */
const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_SSL } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mariadb',
  dialectOptions: {
    useUTC: false,
    ssl:
      DB_SSL === 'true' || DB_SSL === true
        ? {
          require: true,
          rejectUnauthorized: false,
        }
        : null,
  },
  timezone: 'Etc/GMT-2',
  logging: (queryString, queryObject) => {
    logger.debug(queryString)
  },
});

export default sequelize;
