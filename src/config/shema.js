const joi = require("joi")

const tokenSchema = joi.object({
    PORT : joi.string().min(1000).max(9999).required()
})

module.exports = {tokenSchema}