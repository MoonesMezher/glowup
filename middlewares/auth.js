const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.redirect('/home');
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(email !== process.env.EMAIL) {
            return res.redirect('/home');
        }

        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/home');
    }
}

module.exports = requireAuth;