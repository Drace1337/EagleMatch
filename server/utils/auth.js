require(`dotenv`).config({ path: `../config/.env` })
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        const error = new Error('Nie zidentyfikowano.')
        error.statusCode = 401
        throw error
    }
    const token = authHeader.split(' ')[1]
    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    } catch (err) {
        err.statusCode = 500
        throw err
    }
    if (!decodedToken) {
        const error = new Error('Nie zidentyfikowano.')
        error.statusCode = 401
        throw error
    }
}

module.exports = auth