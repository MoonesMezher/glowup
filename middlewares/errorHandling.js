const errorHandling = (err, req, res, next) => {
    res.redirect('/home');
};

module.exports = errorHandling;