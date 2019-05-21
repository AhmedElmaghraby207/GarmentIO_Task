let express = require("express"),
    morgan = require("morgan"),
    path = require("path"),
    bodyParser = require("body-parser"),
    express_session = require("express-session"),
    connect_flash = require("connect-flash"),
    cookie_parser = require("cookie-parser"),
    mongoose = require("mongoose");

const homeRouter = require('./routes/homeRouter')
const hrRouter = require('./routes/hrRoutes')
const employeeRouter = require('./routes/employeeRouter')

//connect to database
mongoose.connect("mongodb://localhost:27017/GarmentIO", {
    useNewUrlParser: true
});

let server = express();

server.use(morgan("short"));

//Error MW
server.use((error, request, response, next) => {
    response.send("Error => " + error);
})

//***************Routers**************/
server.set("view engin", "ejs");
server.set("views", path.join(__dirname, "views"));
server.use(express.static(path.join(__dirname, "public")));
server.use(express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));
server.use(express.static(path.join(__dirname, "node_modules", "jquery", "dist")));
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(express_session({
    secret: "Ahmed Elmaghraby",
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 30000
    }
}));
server.use(cookie_parser());
server.use(connect_flash());

// server.use("/\//", (request, response) => {
//     response.redirect("/garment-hr/login");
// });

server.use('/garment', homeRouter);
server.use('/garment-hr', hrRouter);
server.use('/garment-employee', employeeRouter);

server.use((request, response) => {
    // response.redirect("/garment-hr/login");
    response.send("Not Found");
});

server.listen(3000, function () {
    console.log("Server have been started...");
})