// ----- category model -----

var category = require("../models/category");


// ----- sub category model -----

var subcategory = require("../models/subcategory");


// ----- extra category model -----

var extracategory = require("../models/extracategory");


// ----- brand model -----

var brand = require("../models/brand");


// ----- type model -----

var type = require("../models/type");


// ----- product model -----

var product = require("../models/product");


// ----- add product page -----

module.exports.add_prodcut = async (req, res) => {

    try {
        var categoryData = await category.find({ isActive: true });
        var subcategoryData = await subcategory.find({ isActive: true });
        var extracategoryData = await extracategory.find({ isActive: true })
        var brandData = await brand.find({ isActive: true })
        var typeData = await type.find({ isActive: true })
        if (categoryData) {
            return res.render("product/add_product", {
                categoryData: categoryData,
                subcategoryData: subcategoryData,
                extracategoryData: extracategoryData,
                brandData: brandData,
                typeData: typeData
            })
        }
        else {
            console.log("data not found")
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- insert product -----

module.exports.insert_product = async (req, res) => {

    try {

        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();

        var insert = await product.create(req.body);
        if (insert) {
            console.log("product insert");
            return res.redirect("/admin/product/view_product")
        }
        else {
            console.log("product not insert");
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view product page -----

module.exports.view_product = async (req, res) => {

    try {

        var productData = await product.find({}).populate(["categoryId", "subcategoryId", "extracategoryId", "brandId", "typeId"]).exec();
        if (productData) {
            return res.render("product/view_product", {
                "productData": productData
            })
        }
        else {
            console.log("data not found");
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- set deactive -----

module.exports.set_deactive = async (req, res) => {

    try {

        var change = await product.findByIdAndUpdate(req.query.id, { isActive: false });

        if (change) {
            console.log("deactive");
            return res.redirect("back")
        }
        else {
            console.log("not deactive");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- set active -----

module.exports.set_active = async (req, res) => {

    try {

        var change = await product.findByIdAndUpdate(req.query.id, { isActive: true });

        if (change) {
            console.log("active");
            return res.redirect("back")
        }
        else {
            console.log("not active");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- delete product -----

module.exports.delete_product = async (req, res) => {

    try {

        var oldData = await product.findById(req.query.id);
        if (oldData) {

            var deleteData = await product.findByIdAndDelete(req.query.id);

            if (deleteData) {
                console.log("data delete");
                return res.redirect("back")
            }
            else {
                console.log("data not delete");
                return res.redirect("back")
            }


        }
        else {
            console.log("data not found");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err)
        return res.redirect("back")
    }

}


// ----- delete many -----

module.exports.delete_many = async (req, res) => {
    try {

        var abc = await product.deleteMany({ _id: { $in: req.body.deleteAll } });
        if (abc) {
            return res.redirect("back")

        }
        else {
            console.log("data not delete");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}
