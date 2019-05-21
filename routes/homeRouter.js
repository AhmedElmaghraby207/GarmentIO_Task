let express = require("express"),
    homeRouter = express.Router(),
    path = require("path");

const employeeSchema = require('../models/emplyee');

//SESSION
homeRouter.use((request, response, next) => {
    if (request.session.hrEmail) {
        console.log("Session Found");
        response.locals.hrEmail = request.session.hrEmail;
        next();
    } else {
        console.log("Session Not Found");
        request.flash("msg", "Session dead, please login again.");
        response.redirect("/garment-hr/login");
    }
});

homeRouter.get("/home", ((request, response) => {
    response.locals.msg = request.flash("msg");
    employeeSchema.find({}, (err, result) => {
        if(err) {
            response.status(500).json({error: err})
        } else {
            response.locals.msg = request.flash("msg");
            response.status(200).render("../views/home.ejs", {employees: result})
        }
    })
}));

module.exports = homeRouter;
