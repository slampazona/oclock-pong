import express from 'express';
import * as ScoreController from 'src/controllers/Score';
import { isDayjsDate } from 'src/validators';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 *
 * /score:
 *   get:
 *     tags: ['Score']
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 'Les scores sont retournés'
 *         content:
 *           'application/json':
 *             schema:
 *               type: 'object'
 *               properties: 
 *                  data: 
 *                    type: 'array'
 *                    items:
 *                       allOf:
 *                       - $ref: '#/components/schemas/Score'
 */
router.get('/score', ScoreController.list)

/**
* @swagger
*
* /score:
*   post:
*     tags: ['Score']
*     produces:
*       - application/json
*     requestBody:
*       required: true
*       content: 
*           'application/json':
*               schema:
*                   type: 'object'
*                   properties:
*                       player_1:
*                           type: 'integer'
*                           description: 'Le score du joueur 1'
*                           required: true
*                           example: 1
*                       player_2:
*                           type: 'integer'
*                           description: 'Le score du joueur 2'
*                           required: true
*                           example: 2
*                       score_date:
*                           type: 'string'
*                           format: 'date'
*                           description: '(optionnel) La date du score ( date de création par défaut )'
*                           example: 2021-11-29 14:35
*     responses:
*       200:
*         description: 'Les scores sont retournés'
*         content:
*           'application/json':
*             schema:
*               type: 'object'
*               properties: 
*                  success:
*                    type: 'boolean'
*                  data: 
*                    type: 'array'
*                    items:
*                       allOf:
*                       - $ref: '#/components/schemas/Score'
*/
router.post(
    '/score',
    body('player_1').isInt({gt: 0}),
    body('player_2').isInt({gt: 0}),
    body('score_date').optional().custom(isDayjsDate('YYYY-MM-DD HH:mm')),
    ScoreController.create
)

export default router;