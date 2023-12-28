// ----- express -----

var express = require("express");


// ----- routes -----

var routes = express.Router()


// ----- sub category model -----

var subcategory = require("../models/subcategory")


// ----- category controller -----

var subcategoryController = require("../controllers/subcategoryController")


// ----- add subcategory page -----

routes.get("/add_subcategory", subcategoryController.add_subcategory)


// ----- insert subcategory -----

routes.post("/insert_subcategory", subcategoryController.insert_subcategory)


// ----- view subcategory page -----

routes.get("/view_subcategory", subcategoryController.view_subcategory)


// ----- set deactive -----

routes.get("/set_deactive", subcategoryController.set_deactive)


// ----- set active -----

routes.get("/set_active", subcategoryController.set_active)


// ----- delete subcategory -----

routes.get("/delete_subcategory", subcategoryController.delete_subcategory)


// ----- delete many -----

routes.post("/delete_many", subcategoryController.delete_many)


// ----- get sub category -----

routes.post("/getsubcat", subcategoryController.getsubcat)


// ----- export -----

module.exports = routes;
