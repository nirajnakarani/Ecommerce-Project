// ----- category model -----

var category = require("../models/category");


// ----- sub category model -----

var subcategory = require("../models/subcategory");


// ----- extra category model -----

var extracategory = require("../models/extracategory");


// ----- add extracategory page -----

module.exports.add_extracategory = async (req, res) => {

    try {
        var categoryData = await category.find({ isActive: true });
        var subcategoryData = await subcategory.find({ isActive: true });
        if (categoryData) {
            return res.render("extracategory/add_extracategory", {
                categoryData: categoryData,
                subcategoryData: subcategoryData
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


// ----- insert extracategory -----

module.exports.insert_extracategory = async (req, res) => {

    try {

        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();

        var insert = await extracategory.create(req.body);
        if (insert) {
            console.log("extracategory insert");
            return res.redirect("/admin/extracategory/view_extracategory")
        }
        else {
            console.log("extracategory not insert");
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view extracategory page -----

module.exports.view_extracategory = async (req, res) => {

    try {

        var extracategoryData = await extracategory.find({}).populate(["categoryId", "subcategoryId"]).exec();
        if (extracategoryData) {
            return res.render("extracategory/view_extracategory", {
                "extracategoryData": extracategoryData
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

        var change = await extracategory.findByIdAndUpdate(req.query.id, { isActive: false });

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

        var change = await extracategory.findByIdAndUpdate(req.query.id, { isActive: true });

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


// ----- delete extracategory -----

module.exports.delete_extracategory = async (req, res) => {

    try {

        var oldData = await extracategory.findById(req.query.id);
        if (oldData) {

            var deleteData = await extracategory.findByIdAndDelete(req.query.id);

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

        var abc = await extracategory.deleteMany({ _id: { $in: req.body.deleteAll } });
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

// ----- get extra cat -----

module.exports.getextracat = async (req, res) => {
    try {

        var extracatData = await extracategory.find({ subcategoryId: req.body.subcategoryId, isActive: true });
        if (extracatData) {

            var opt = `<option value="">-- - --</option>`;

            extracatData.map((v, i) => {
                opt += `<option value="${v.id}">${v.extracategory_name}</option>`
            })

            return res.json(opt)


        }
        else {
            console.log("sub category not found")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}