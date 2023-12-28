// ----- category model -----

var category = require("../models/category");


// ----- sub category model -----

var subcategory = require("../models/subcategory");


// ----- add subcategory page -----

module.exports.add_subcategory = async (req, res) => {

    try {
        var categoryData = await category.find({ isActive: true });
        if (categoryData) {
            return res.render("subcategory/add_subcategory", {
                categoryData: categoryData
            })
        }
        else {
            console.log("category not found");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- insert subcategory -----

module.exports.insert_subcategory = async (req, res) => {

    try {

        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();

        var insert = await subcategory.create(req.body);
        if (insert) {
            console.log("subcategory insert");
            return res.redirect("/admin/subcategory/view_subcategory")
        }
        else {
            console.log("subcategory not insert");
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view subcategory page -----

module.exports.view_subcategory = async (req, res) => {

    try {

        var subcategoryData = await subcategory.find({}).populate("categoryId").exec();
        if (subcategoryData) {
            return res.render("subcategory/view_subcategory", {
                "subcategoryData": subcategoryData
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

        var change = await subcategory.findByIdAndUpdate(req.query.id, { isActive: false });

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

        var change = await subcategory.findByIdAndUpdate(req.query.id, { isActive: true });

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


// ----- delete subcategory -----

module.exports.delete_subcategory = async (req, res) => {

    try {

        var oldData = await subcategory.findById(req.query.id);
        if (oldData) {

            var deleteData = await subcategory.findByIdAndDelete(req.query.id);

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

        var abc = await subcategory.deleteMany({ _id: { $in: req.body.deleteAll } });
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


// ----- get subcat -----

module.exports.getsubcat = async (req, res) => {
    try {

        var subcatData = await subcategory.find({ categoryId: req.body.categoryId, isActive: true });
        if (subcatData) {

            var opt = `<option value="">-- - --</option>`;

            subcatData.map((v, i) => {
                opt += `<option value="${v.id}">${v.subcategory_name}</option>`
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