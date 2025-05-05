require("dotenv").config(); // use env
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const allow_list = ["/", "/register", "/login"];

    if (allow_list.find(item => '/v1/api' + item === req.originalUrl)) {
        next();
    } else {
        if (req?.headers?.authorization?.split(' ')?.[1]) {
            const token = req.headers.authorization.split(' ')[1];

            // verify token
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                console.log("Access_token", decoded);
                next();
            } catch (error) {
                return res.status(401).json({
                    message: "Token bị hết hạn hoặc không hợp lệ"
                })
            }

        } else {
            // return exception 
            return res.status(401).json({
                message: "Bạn chưa truyền access toke ở header hoặc token bị hết hạn"
            })
        }
    }
}

module.exports = auth;