import express from 'express';
import * as ScoreController from 'src/controllers/Score';

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
*                   $ref: '#/components/schemas/Score'
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
router.post('/score', ScoreController.create)

export default router;