const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    
    if(!authorization) {
        throw new Error('Authorization must be required');
    }

    const token = authorization.split(' ')[1];

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(email !== process.env.EMAIL) {
            throw new Error('Failed authorization')
        }

        next();
    } catch (err) {
        throw new Error('Request is not authorized')
    }
}

module.exports = requireAuth;