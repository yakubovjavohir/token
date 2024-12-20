const jwt = require("jsonwebtoken")

class Token {
    #key
    constructor(key){
        this.#key = key
    }

    generateToken(){
        const key = this.#key
            const token = jwt.sign({
                data : "yangi token",
                exp : Math.trunc(Date.now() + 24*60*60)
            }, key)
            return token
    }
}


module.exports = {Token}