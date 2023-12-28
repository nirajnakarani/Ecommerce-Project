// ----- express -----

var express = require("express");


// ----- routes -----

var routes = express.Router()


// ----- prodcut model -----

var prodcut = require("../models/product")


// ----- prodcut controller -----

var prodcutController = require("../controllers/productController")


// ----- add prodcut page -----

routes.get("/add_product", prodcutController.add_prodcut)


// ----- insert prodcut -----

// routes.post("/insert_prodcut", prodcutController.insert_prodcut)


// ----- view prodcut page -----

// routes.get("/view_prodcut", prodcutController.view_prodcut)


// ----- set deactive -----

// routes.get("/set_deactive", prodcutController.set_deactive)


// ----- set active -----

// routes.get("/set_active", prodcutController.set_active)


// ----- delete prodcut -----

// routes.get("/delete_prodcut", prodcutController.delete_prodcut)


// ----- delete many -----

// routes.post("/delete_many", prodcutController.delete_many)


// ----- export -----

module.exports = routes;
