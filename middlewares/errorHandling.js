const errorHandling = (err, _req, res, _next ) => {

    if (err.name === 'JsonWebTokenError') return res.status(401).json({message : 'Invalid token error'});
    if (err.name === 'SequelizeValidationError') return res.status(400).json({message : err.errors.map(e => e.message)});
    if (err.name === 'SequelizeConstraintError') return res.status(400).json({message : err.errors.map(e => e.message)});
    if (err.name === 'Unauthorized') return res.status(401).json({message : err.message});
    if (err.name === 'BadRequest') return res.status(400).json({message : err.message});
    if (err.name === 'NotFound') return res.status(404).json({message : err.message});
    if (err.name === 'isEmail') return res.status(400).json({message : 'Email is required'});
    if (err.name === 'isPassword') return res.status(400).json({message : 'Password is required'});
    if (err.name === 'SequelizeUniqueConstraintError') return res.status(400).json({message : 'Email already exists'});
    if (err.name === 'isImage') return res.status(400).json({message : 'Image is required'});
    return res.status(500).json({message : 'Internal server error'});

}


module.exports = { errorHandling }