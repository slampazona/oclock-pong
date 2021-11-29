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
    try {
        return res.send({
            success: true,
            data: [],
        });
    }
    catch (error) {
        return next(error);
    }
}