let express = require("express"),
    hrRouter = express.Router(),
    path = require("path");

const hrSchema = require('../models/hr');



hrRouter.get("/login", ((request, response) => {
    response.locals.msg = request.flash("msg");
    response.render(path.join(__dirname, "..", "views", "hrs", "login.ejs"));
}));

hrRouter.post("/login", ((request, response) => {

    // console.log(request.body.email)
    // response.status(200).json({email: request.body.email})

    hrSchema.findOne({
            email: request.body.email,
            password: request.body.password
        },
        (error, hr) => {
            if (hr) {
                request.session.hrEmail = request.body.email;
                response.redirect("/garment/home");
            } else {
                request.flash("msg", "Username or password is not valid");
                response.redirect("/garment-hr/login");
            }
        })
}));

hrRouter.get("/logout", ((request, response) => {
    request.session.destroy((error) => {
        response.redirect("/garment-hr/login");
    });
}));


hrRouter.post('/register', (request, response) => {
    const hr = new hrSchema({
        email: request.body.email,
        password: request.body.password
    });

    console.log(hr);

    hr.save()
        .then(result => {
            response.status(201).json({
                    message: 'HR added successfully',
                    result: result
                })
                .catch(err => {
                    response.status(500).json({
                        error: err
                    })
                })
        })
})



module.exports = hrRouter;