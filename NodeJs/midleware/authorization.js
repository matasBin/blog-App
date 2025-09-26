const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")

dotenv.config()

module.exports = {

    jwtDecode: async (req, res, next) => {
        const token = req.headers.authorization;

        if(!token) {
            return res.send({success: false, message: "Missing authorization token"})
        }

        let decodedToken

        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        } catch (e) {
            return res.send({success: false, message: "Invalid token"})
        }

        if(!decodedToken) {
            return res.send({success: false, message: "Invalid token"})
        }

        req.decodedToken = decodedToken
        next()
    }
}