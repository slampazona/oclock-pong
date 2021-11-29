import express from 'express';
import { body, query } from 'express-validator';
import * as ScoreController from 'src/controllers/Score';
import { isDayjsDate } from 'src/validators';
import validationResult from 'src/middlewares/validationResult';

const router = express.Router();

/**
 * @swagger
 *
 * /score:
 *   get:
 *     tags: ['Score']
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: limit
 *       in: query
 *       description: La limite à afficher, 15 par défaut, 0 pour no limit
 *       required: false
 *       example: 15
 *       schema:
 *           type: integer
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
router.get(
    '/score',
    query('limit').optional().isInt({ min: 0, max: 100 }),
    validationResult,
    ScoreController.list
)

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
*                       pseudo:
*                           type: 'string'
*                           description: 'Le pseudo du gagnant'
*                           required: true
*                           example: 'MICHEL'
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
    body('pseudo').isString().notEmpty(),
    body('player_1').isInt({ min: 0 }),
    body('player_2').isInt({ min: 0 }),
    body('score_date').optional().custom(isDayjsDate('YYYY-MM-DD HH:mm')),
    validationResult,
    ScoreController.create
)

// Récupération d'une 404 pour les routes d'api
router.use((req, res) => {
    res.status(404).send({
        message: 'A bah raté, c\'est une 404, rester sur cette dernière entrainera le sacrifice d\'un chaton ... A toi de voir !'
    })
})
export default router;