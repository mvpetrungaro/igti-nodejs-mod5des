const { check, validationResult } = require('express-validator')

function validate(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400)
        next(errors.array())
    } else {
        next()
    }
}

module.exports = {
    check,
    validate
}