const express = require('express');
const employeeRouter = express.Router();
const path = require('path');
const employeeSchema = require('../models/emplyee');

//SESSION
employeeRouter.use((request, response, next) => {
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


employeeRouter.get('/add', (request, response, next) => {
    response.locals.msg = request.flash("msg");
    response.render(path.join(__dirname, "..", "views", "employees", "add.ejs"))
})

employeeRouter.post('/add', (request, response, next) => {
    if (request.body.name && request.body.age) {
        const emp = new employeeSchema({
            name: request.body.name,
            age: request.body.age
        });
        emp.save().then(employee => {
            // response.status(201).json({
            //     message: "Employee added successfully",
            //     employee: employee
            // })
            response.redirect('/garment/home')
        })
    }
})

employeeRouter.get('/delete/:id', (request, response, next) => {
    employeeSchema.updateOne({
        _id: request.params.id
    }, {
        $set: {
            deleted: true
        }
    }, (err) => {
        if (err) {
            response.status(500).json({
                error: err
            });
        } else {
            response.redirect("/garment/home");
        }
    })
})

employeeRouter.get('/recover/:id', (request, response, next) => {
    employeeSchema.updateOne({
        _id: request.params.id
    }, {
        $set: {
            deleted: false
        }
    }, (err) => {
        if (err) {
            response.status(500).json({
                error: err
            });
        } else {
            response.redirect("/garment/home");
        }
    })
})



module.exports = employeeRouter;