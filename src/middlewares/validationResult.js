import { validationResult } from 'express-validator';

export default (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ 
          success: false,
          errors: errors.array() 
        });
    }
    return next();
}