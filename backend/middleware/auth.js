const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).send({ error: 'Access token is missing' });
        }

        jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
            if (err) {
                return res.status(403).send({ error: 'Invalid or expired token' });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).send({ error: 'Authorization header is missing or incorrect' });
    }
};
