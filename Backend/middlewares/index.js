const pool = require("../config");

async function logger(req, res, next) {
    const timestamp = new Date().toISOString().substring(0, 19)
    console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
    next()
}

async function isLoggedIn(req, res, next) {
    let authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).json({ message: 'You are not logged in' })
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        return res.status(401).json({ message: 'You are not logged in' })
    }

    try {
        // Single JOIN query instead of 2 separate queries
        const [rows] = await pool.query(
            'SELECT u.id, u.username, u.fname, u.lname, u.email, u.phone, u.image, u.gender, u.role, u.age, u.weight, u.height, u.status ' +
            'FROM tokens t INNER JOIN users u ON t.u_id = u.id WHERE t.token = ?',
            [part2]
        )

        if (!rows[0]) {
            return res.status(401).json({ message: 'Invalid or expired token' })
        }

        req.user = rows[0]
        next()
    } catch (err) {
        return res.status(500).json({ message: 'Authentication error' })
    }
}

function isAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' })
    }
    next()
}

module.exports = { logger, isLoggedIn, isAdmin }
