require(`dotenv`).config({ path: `../config/.env` })
const jwt = require('jsonwebtoken')

const authCaptain = async (req, res, next) => {
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
    if (decodedToken.role !== 'captain') {
        const error = new Error('Nie masz uprawnień kapitana.')
        error.statusCode = 401
        throw error
    }
    req.userId = decodedToken.userId
    req.role = decodedToken.role
    next()
}

module.exports = authCaptain