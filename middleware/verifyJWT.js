const jwt = require('jsonwebtoken');
const {User} = require('../../Trainingee_ V 2.0/node-js-app/API/models/User');
const verifyJWT = async(req, res, next) => {
    const getTokenInDataBase = req.UserInfo.id
    const token = await User.findOne({_id:getTokenInDataBase})
    jwt.verify(token.jwt, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).render('login.ejs');
        }
        next();
    });
};

module.exports = verifyJWT;