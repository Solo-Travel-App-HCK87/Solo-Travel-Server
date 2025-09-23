const errorHandling = (err, _req, res, _next ) => {

    if (err.name === 'JsonWebTokenError') return res.status(401).json({message : 'Invalid token error'});
    if (err.name === 'Unauthorized') return res.status(401).json({message : err.message});
    if (err.name === 'BadRequest') return res.status(400).json({message : err.message});
    if (err.name === 'NotFound') return res.status(404).json({message : err.message});
    return res.status(500).json({message : 'Internal server error'});

}


module.exports = { errorHandling }