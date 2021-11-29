import dayjs from 'dayjs';
import { validationResult } from 'express-validator';
import { Score } from 'src/models';

export const list = async (req, res, next) => {
    try {
        const scores = await Score.findAll({
            limit: 15,
            order: [
                ['score_date', 'DESC']
            ]
        });
        return res.send({
            data: scores,
        });
    }
    catch (error) {
        return next(error);
    }
}

export const create = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ 
          success: false,
          errors: errors.array() 
        });
    }

    const score = await Score.create({
        player_1: req.body.player_1,
        player_2: req.body.player_2,
        score_date: req.body.score_date || dayjs()
    });

    try {
        return res.send({
            success: true,
            data: score,
        });
    }
    catch (error) {
        return next(error);
    }
}