import dayjs from 'dayjs';
import { Score } from 'src/models';

export const list = async (req, res, next) => {
    try {
        let limit = 15;
        if (req.query.limit){
            if(Number(req.query.limit) === 0){
                limit = null;
            }
            else {
                limit = Number(req.query.limit);
            }
        }
        const scores = await Score.findAll({
            limit,
            order: [
                ['score_date', 'ASC']
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
    try {
        const score = await Score.create({
            pseudo: req.body.pseudo,
            player_1: req.body.player_1,
            player_2: req.body.player_2,
            score_date: req.body.score_date || dayjs()
        });

        return res.send({
            success: true,
            data: score,
        });
    }
    catch (error) {
        return next(error);
    }
}