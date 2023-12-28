// ----- mongoose -----

var mongoose = require("mongoose");


// ----- product img path -----

var productImgPath = "/uploads/productImg";


// ----- multer -----

var multer = require("multer")


// ----- path -----

var path = require("path")


// ----- product schema -----

var productSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoryData",
        required: true
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategoryData",
        required: true
    },
    extracategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "extracategoryData",
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brandData",
        required: true
    },
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "typeData",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    old_price: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    product_img: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    updatedDate: {
        type: String,
        required: true
    },
})


// ----- img -----

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", productImgPath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})


// ----- single img -----

productSchema.statics.uploadproductImg = multer({ storage: storage }).single("product_img");


// ----- export product img path -----

productSchema.statics.productImgPath = productImgPath;


// ----- table  -----

var product = mongoose.model("productData", productSchema);


// ----- export model -----

module.exports = product