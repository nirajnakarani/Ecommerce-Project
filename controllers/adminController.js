// ----- admin model -----

var admin = require("../models/admin");


// ----- path -----

var path = require("path")


// ----- fs -----

var fs = require("fs")


// ----- nodemailer -----

var nodemailer = require("nodemailer");
const e = require("express");
const { emit } = require("process");


// ----- login -----

module.exports.login = async (req, res) => {

    try {
        return res.render("admin/login")

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- login admin -----

module.exports.login_admin = async (req, res) => {

    try {
        return res.redirect("/admin/dashboard")

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- dashboard -----

module.exports.dashboard = async (req, res) => {

    try {
        return res.render("admin/dashboard")

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- add admin page -----

module.exports.add_admin = async (req, res) => {

    try {

        return res.render("admin/add_admin")
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- insert admin -----

module.exports.insert_admin = async (req, res) => {

    try {

        if (req.body.confirm_pass != req.body.password) {
            console.log("password not match");
            return res.redirect("back")
        }
        else {
            var imgPath = ""
            if (req.file) {
                imgPath = admin.adminImgPath + "/" + req.file.filename;
            }
            req.body.admin_img = imgPath;
            req.body.isActive = true;
            req.body.createdDate = new Date().toLocaleString();
            req.body.updatedDate = new Date().toLocaleString();

            var insert = await admin.create(req.body);
            if (insert) {
                console.log("admin insert");
                return res.redirect("/admin/view_admin")
            }
            else {
                console.log("admin not insert");
                return res.redirect("back")
            }
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view admin page -----

module.exports.view_admin = async (req, res) => {

    try {

        var adminData = await admin.find({});
        if (adminData) {

            return res.render("admin/view_admin", {
                "adminData": adminData
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

        var change = await admin.findByIdAndUpdate(req.query.id, { isActive: false });

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

        var change = await admin.findByIdAndUpdate(req.query.id, { isActive: true });

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


// ----- delete admin -----

module.exports.delete_admin = async (req, res) => {

    try {

        var oldData = await admin.findById(req.query.id);
        if (oldData) {

            if (oldData.admin_img) {
                var fullPath = path.join(__dirname, "..", oldData.admin_img);

                await fs.unlinkSync(fullPath)

                var deleteData = await admin.findByIdAndDelete(req.query.id);

                if (deleteData) {
                    console.log("img and data delete");
                    return res.redirect("back")
                }
                else {
                    console.log("data not delete");
                    return res.redirect("back")
                }

            }
            else {
                console.log("img not found");
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

        var abc = await admin.deleteMany({ _id: { $in: req.body.deleteAll } });
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


// ----- profile -----

module.exports.profile = async (req, res) => {
    try {
        return res.render("admin/profile")

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


// ----- edit admin page -----

module.exports.edit_admin = async (req, res) => {

    try {

        var adminData = await admin.findById(req.query.id);
        if (adminData) {
            return res.render("admin/update_admin", {
                adminData: adminData
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


// ----- update admin -----

module.exports.update_admin = async (req, res) => {

    try {
        var oldData = await admin.findById(req.body.editId);
        if (oldData) {


            if (req.file) {
                if (oldData.admin_img) {

                    var fullPath = path.join(__dirname, "..", oldData.admin_img);
                    await fs.unlinkSync(fullPath);

                    req.body.updatedDate = new Date().toLocaleString();
                    req.body.admin_img = admin.adminImgPath + "/" + req.file.filename

                    var update = await admin.findByIdAndUpdate(req.body.editId, req.body)
                    if (update) {
                        console.log("update success");
                        return res.redirect("/admin/view_admin");
                    }
                    else {
                        console.log("update unsuccess");
                        return res.redirect("back");
                    }
                }
                else {
                    console.log("img not found");
                    return res.redirect("back")
                }
            }
            else {
                req.body.admin_img = oldData.admin_img;
                req.body.updatedDate = new Date().toLocaleString();

                var update = await admin.findByIdAndUpdate(req.body.editId, req.body);
                if (update) {
                    console.log("update success");
                    return res.redirect("/admin/view_admin");
                }
                else {
                    console.log("update unsuccess");
                    return res.redirect("back");
                }

            }
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


// ----- logout -----

module.exports.logout = async (req, res) => {
    try {
        req.session.destroy();
        if (req.user) {
            return res.redirect("/admin/dashboard");
        }
        else {
            return res.redirect("/admin/")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


// ----- reset page -----

module.exports.resetPage = async (req, res) => {
    try {
        return res.render("admin/resetPage")
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


// ----- send mail -----

module.exports.sendMail = async (req, res) => {
    try {
        var adminData = await admin.findOne({ email: req.body.email });
        if (adminData) {

            // OTP Generation

            const generateOTP = (length) => {
                let otp = ''

                for (let i = 0; i < length; i++) {
                    otp += Math.floor(Math.random() * 10)
                }

                return otp
            }

            var OTP = generateOTP(6)


            // setup our mail and pass 

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: "nakaraniniraj87580@gmail.com",
                    pass: "lagqsepgtzjcshka",
                },
            });


            // send mail with defined transport object

            const info = await transporter.sendMail({
                from: 'nakaraniniraj87580@gmail.com', // sender address
                to: adminData.email, // list of receivers
                subject: "OTP ✔", // Subject line
                html: `<h1>OTP Is Here : ${OTP}</h1>`, // html body
            });
            if (info) {
                res.cookie("otp", OTP)
                res.cookie("email", adminData.email)
                return res.render("admin/otpPage")
            }
            else {
                console.log("mail not send")
                return res.redirect("/admin/")
            }
        }
        else {
            console.log("invalid email");
            return res.redirect("/admin/")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("/admin/")
    }
}


// ----- check otp -----

module.exports.checkOtp = async (req, res) => {
    try {
        if (req.cookies.otp == req.body.otp) {
            return res.render("admin/newpassPage")
        }
        else {
            console.log("otp not match");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


// ----- check new pass -----

module.exports.checknewPass = async (req, res) => {
    try {
        if (req.body.npass == req.body.cpass) {

            var email = req.cookies.email;
            if (email) {
                var adminData = await admin.findOne({ email: email });
                if (adminData) {
                    var updatePass = await admin.findByIdAndUpdate(adminData.id, { password: req.body.npass })
                    if (updatePass) {
                        res.clearCookie("otp");
                        res.clearCookie("email");
                        return res.redirect("/admin/")
                    }
                    else {
                        console.log("password not update");
                        return res.redirect("/admin/")
                    }
                }
                else {
                    console.log("data not found");
                    return res.redirect("/admin/")
                }
            }
            else {
                console.log("email cookie not found");
                return res.redirect("/admin/")
            }



        }
        else {
            console.log("both pass are not match")
            return res.redirect("/admin/")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("/admin/")
    }
}