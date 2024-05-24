const express = require("express");
const logger = require("./utils/logger");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");

const dotenv = require("dotenv");

/* Reading global variables from config file */
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(session({
    secret: "This is a secret!",
    cookie: {
        maxAge: 3600000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

const routes = require("./routes");
app.use("/", routes);

//turn on serving static files (required for delivering css to client)
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send("Hello weathertop!");
});

app.listen(PORT, function() {
  console.log(`Weathertop running and listening on port ${PORT}`);
});



module.exports = app;