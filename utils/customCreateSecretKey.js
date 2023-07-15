const config = require("../config/env")


exports.customCreateSecretKey=()=>{
    try {
        return config.getInstance().secretKey
    } catch (error) {
        console.log(error)
    }
}