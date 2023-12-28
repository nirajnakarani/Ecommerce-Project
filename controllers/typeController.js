// ----- category model -----

var category = require("../models/category");


// ----- sub category model -----

var subcategory = require("../models/subcategory");


// ----- extra category model -----

var extracategory = require("../models/extracategory");


// ----- type model -----

var type = require("../models/type");


// ----- add type page -----

module.exports.add_type = async (req, res) => {

    try {
        var categoryData = await category.find({ isActive: true });
        var subcategoryData = await subcategory.find({ isActive: true });
        var extracategoryData = await extracategory.find({ isActive: true })
        if (categoryData) {
            return res.render("type/add_type", {
                categoryData: categoryData,
                subcategoryData: subcategoryData,
                extracategoryData: extracategoryData
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


// ----- insert type -----

module.exports.insert_type = async (req, res) => {

    try {

        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();

        var insert = await type.create(req.body);
        if (insert) {
            console.log("type insert");
            return res.redirect("/admin/type/view_type")
        }
        else {
            console.log("type not insert");
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view type page -----

module.exports.view_type = async (req, res) => {

    try {

        var typeData = await type.find({}).populate(["categoryId", "subcategoryId","extracategoryId"]).exec();
        if (typeData) {
            return res.render("type/view_type", {
                "typeData": typeData
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

        var change = await type.findByIdAndUpdate(req.query.id, { isActive: false });

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

        var change = await type.findByIdAndUpdate(req.query.id, { isActive: true });

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


// ----- delete type -----

module.exports.delete_type = async (req, res) => {

    try {

        var oldData = await type.findById(req.query.id);
        if (oldData) {

            var deleteData = await type.findByIdAndDelete(req.query.id);

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

        var abc = await type.deleteMany({ _id: { $in: req.body.deleteAll } });
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
