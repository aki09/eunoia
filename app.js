const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = [];
var customers = [];

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'nishtha',
	database: 'dbdb',
	port: 3306
});

connection.connect((err) => {
	if (err) {
		console.log("ERRE")
	}
	else {
		console.log("HELLOO NISHTHAAA")
	}
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', function (req, res) {
	var newItem = 'AYUSH';

	res.render('index', { new_item: newItem });
});

app.get('/index.html', function (req, res) {
	var newItem = 'AYUSH';

	res.render('index', { new_item: newItem });
});

app.get('/dashboard.html', function (req, res) {
	res.render('dashboard');
});

app.get('/ad-listing.html', function (req, res) {
	res.render('ad-listing');
});

app.get('/ad-orders.html', function (req, res) {
	res.render('ad-orders');
});

app.get('/ad-customer.html', function (req, res) {
	res.render('ad-customers');
});

app.get('/category.html', (req, res) => {
	items = [];
	let sql = 'select * from Inventory';
	connection.query(sql, (err, rows) => {
		if (err) {
			throw err
		} else {
			console.log("DATA BHEJ DIYA MENE NISHTHA")
			// console.log(rows)
			console.log("DONT SCOLD ME")
			// res.send("Done");
		}
		console.log(rows[0]['Type']);

		for (let i = 0; i < rows.length; i++) {
			items.push(rows[i]);
		}
		res.render('category', { inventory: items });
		console.log(items);
	})

	// console.log(post)
});

app.get('/customer.html', function (req, res) {
	let sql = 'select * from customers';
	customers = [];
	connection.query(sql, (err, rows) => {
		if (err) {
			throw err
		} else {
			console.log("DATA BHEJ DIYA MENE NISHTHA")
			// console.log(rows)
			console.log("DONT SCOLD ME")
			// res.send("Done");
		}
		for (let i = 0; i < rows.length; i++) {
			customers.push(rows[i]);
		}
		console.log(customers);
		res.render('customers', { customers: customers });	
	})
});

app.post('/ad-listing.html', (req, res) => {
	var item = req.body.type;
	var status = req.body.status;
	var ig = req.body.ig;
	var condition = req.body.condition;
	var price = req.body.price;
	let sql = "insert into Inventory set ?"
	let post = { Type: item, Status: status, Price: price, Item_condition: condition, IG_Link: ig }
	connection.query(sql, post, (err, rows) => {
		if (err) {
			throw err
		} else {
			console.log("DATA BHEJ DIYA MENE NISHTHA")
			// console.log(rows)
			console.log("DONT SCOLD ME")
			// res.send("Done");
			console.log('solddd');
		}
	})
	res.redirect('/ad-listing.html');
	// console.log(post)
});

app.post('/ad-customer.html', (req, res) => {
	var name = req.body.name;
	var num = req.body.num;
	var add = req.body.add;
	var state = req.body.state;
	var ig = req.body.ig;
	var email = req.body.email;
	let sql = "insert into customers set ?"
	let post = { Name: name, Instagram_Handle: ig, Address: add, State: state, Contact: num, Email_ID: email }
	connection.query(sql, post, (err, rows) => {
		if (err) {
			throw err
		} else {
			console.log("DATA BHEJ DIYA MENE NISHTHA")
			// console.log(rows)
			console.log("DONT SCOLD ME")
			// res.send("Done");
			console.log('solddd');
		}
	})
	res.redirect('/ad-customer.html');
	// console.log(post)
});

app.listen(5000, function () {
	console.log("Started");
});