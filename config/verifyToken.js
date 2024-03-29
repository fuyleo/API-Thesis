const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {

    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.send("Token is invalid");
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }

}