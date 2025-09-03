require("dotenv").config()


module.exports = {
    PORT:process.env.PORT,
    MONGODB_URL:process.env.MONGODB_URL,
    JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN,
    JWT_SECRET:process.env.JWT_SECRET,

}