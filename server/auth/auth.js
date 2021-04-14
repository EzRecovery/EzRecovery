const jwt = require('jsonwebtoken');
const cs = require('../database-confiq/config');

exports.isValidAuth = async (req, res, next) => {
    console.log(req.headers.token)
    if (req.headers.token) {
        const token = req.headers.token;
        jwt.verify(token, cs.JWT_SECRET_code, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ status: 'fail' });
            }
            req.userId = decodedToken.id;
            req.isAdmin = decodedToken.isAdmin && true
            req.isStudent = decodedToken.isStudent && true

            console.log(decodedToken)
            console.log(req.userId, req.isAdmin)
            next();
        });
    } else {
        res.status(401).json({ status: 'fail else' });
    }
};

exports.checkAuth = async (req, res, next) => {
    // console.log(req)
    if (req.headers.token) {
        const token = req.headers.token;
        jwt.verify(token, cs.JWT_SECRET_code, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ status: 'fail 1' });
            }
            // console.log(decodedToken);
            if (decodedToken) {
                // console.log(Date.now() , decodedToken.exp * 1000)
                if (Date.now() <= decodedToken.exp * 1000) {
                    req.user = decodedToken.id;
                    res.status(200).json({ status: 'success', id: decodedToken.id });
                } else {
                    res.status(401).json({ status: 'fail 2' });
                }
            }
        });
    } else {
        res.status(401).json({ status: 'fail 3' });
    }
};