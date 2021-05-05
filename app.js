const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function (req, res) {
	var newItem = 'AYUSH';

	res.render('index', { new_item: newItem });
});

app.listen(3000, function() {
	console.log("Started");
});