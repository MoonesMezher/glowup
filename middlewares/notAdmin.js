const jwt = require('jsonwebtoken');

const notAdmin = (req, res, next) => {
    const token = req.cookies.token;

    try {
        if(token) {
            const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
            if(email === process.env.EMAIL) {
                return res.redirect('/');
            }
        }

        next();
    } catch (err) {
        throw new Error("Authorization failed");
    }
}

module.exports = notAdmin;