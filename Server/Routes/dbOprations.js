const express = require("express");
const { defaultRoute } = require("../controller/dbOpration");
const route = express.Router();
 
route.get("/",defaultRoute)

module.exports = route

