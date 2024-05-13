const express = require("express");
const logger = require("./utils/logger");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");

var hbs = handlebars.create({});
// helper to print out the units of each details
hbs.handlebars.registerHelper('formatUnit', function(key) {
    const unitMap = {
        'Temperatur': 'Grad',
        'Wind': 'bft',
        'Luftdruck': 'hpa',
    };
    return unitMap[key];
});

/* Reading global variables from config file */
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

const routes = require("./routes");
app.use("/", routes);


//turn on serving static files (required for delivering css to client)
app.use(express.static("public"));
//configure template engine
//app.set("views", "views");
//app.set("view engine", "pug");

app.get('/', (req, res) => {
    res.send("Hello weathertop!");
});

app.listen(PORT, function() {
  console.log(`Weathertop running and listening on port ${PORT}`);
});

module.exports = app;