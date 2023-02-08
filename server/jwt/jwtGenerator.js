const  jwt = require ("jsonwebtoken")
const  dotenv = require  ("dotenv")
dotenv.config();

const  generateJWT = (user) => {
	return  jwt.sign(user, process.env.jwtSecret, { expiresIn:  '1h' })
}
module.exports = generateJWT