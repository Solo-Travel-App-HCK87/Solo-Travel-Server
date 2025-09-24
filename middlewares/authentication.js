const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt')

const authentication = async (req,_res,next) => {

    if (!req.headers.authorization) return next({name : 'JsonWebTokenError', message : 'Invalid token'});

    try {
        
        const token = req.headers.authorization.split(' ')[1];
        const isTokenValid = verifyToken(token);
        const isUserExists = await User.findByPk(+isTokenValid.id);
        if (!isUserExists) return next({name : 'Unauthorized', message : 'Invalid email/password'});
        req.user = isUserExists
        next()

    } catch (error) {
        
        next(error)

    }


}


module.exports = { authentication }


