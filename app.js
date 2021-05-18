const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = [];
var customers = [];
var orders = [];
var payment = [];
var order_item = [];

order_item = [
	{ Item_ID: 1, Type: 'Slip Dress', Price: 1300 },
	{ Item_ID: 3, Type: 'Graphic T-Shirt', Price: 600 }
];

payment = [
	{
		Payment_Mode: 'Cash on Delivery',
		Payment_Date: '14/05/21'
	},
	{
		Payment_Mode: 'UPI',
		Payment_Date: '15/05/21'
	}
];

items = [
	{
		Item_ID: 3,
		Type: 'Graphic T-Shirt',
		Status: 'available',
		Price: 600,
		Item_Condition: '2',
		IG_Link: 'https://lp2.hm.com/hmgoepprod?set=source[/55/49/5549ef5108f336451b6a9fad793895098d3ebcb1.jpg],origin[dam],category[ladies_tops_printed_tshirts],type[DESCRIPTIVESTILLLIFE],res[y],hmver[1]&call=url[file:/product/main]'
	},
	{
		Item_ID: 1,
		Type: 'Slip Dress',
		Status: 'available',
		Price: 1300,
		Item_Condition: '3',
		IG_Link: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fc1%2F05%2Fc105a2d79bee8098404bb9e43b2af3b8305268fe.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]'
	}
];

customers = [
	{
		Customer_ID: 2,
		Name: 'Akshat Bhatia',
		Instagram_Handle: 'akshat.bhatia',
		Address: '29, Siri Fort Road',
		State: 'Delhi',
		Contact: '8586043037',
		Email_ID: 'akshatbhatia05@gmail.com'
	},
	{
		Customer_ID: 1,
		Name: 'nishtha wakankar',
		Instagram_Handle: 'nishthawakankar',
		Address: 'A67, Sarasvati Vihar',
		State: 'Delhi',
		Contact: '9971770749',
		Email_ID: 'nishthawakankar@yahoo.com'
	}
];

orders = [
	{
		Order_ID: 101,
		Order_Date: '14/05/21',
		Amount: 1000,
		Delivery_Address: '29, Siri Fort Road',
		Order_Status: 'Pending'
	},
	{
		Order_ID: 102,
		Order_Date: '15/05/21',
		Amount: 600,
		Delivery_Address: 'N2, Green Park Main',
		Order_Status: 'Pending'
	}
];

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

// app.get('/dashboard.html', function (req, res) {
// 	res.render('dashboard');
// });

app.get('/login.html', function (req, res) {
	res.render('login');
});

app.get('/blog.html', function (req, res) {
	res.render('blog');
});

app.get('/user-profile.html', function (req, res) {
	res.render('user-profile');
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

app.get('/about-us.html', function (req, res) {
	res.render('about-us');
});

app.get('/category.html', (req, res) => {
	items = [];
	let sql = 'select * from Inventory';
	connection.query(sql, (err, rows) => {
		if (err) {
			throw err
		} else {
		}
		for (let i = 0; i < rows.length; i++) {
			items.push(rows[i]);
		}
		res.render('category', { inventory: items });
	})
	// res.render('category', { inventory: items });
	// console.log(post)
});

app.get('/customer.html', function (req, res) {
	let sql = 'select * from customers';
	customers = [];
	connection.query(sql, (err, rows) => {
		if (err) {
			throw err
		} else {
		}
		for (let i = 0; i < rows.length; i++) {
			customers.push(rows[i]);
		}
		console.log(customers);
		res.render('customers', { customers: customers });
	})
	// res.render('customers', { customers: customers });
});

app.get('/dashboard.html', function (req, res) {
	let sql = 'select Order_ID, DATE_FORMAT(Order_Date, \'%d/%m/%y\') "Order_Date", Amount, Delivery_Address, Order_Status from orders order by Order_ID';
	orders = [];
	connection.query(sql, (err, rows) => {
		if (err) {
			throw err
		} else {
		}
		var query = "SELECT Name FROM Customers where Customer_ID in( SELECT Customer_ID FROM Customer_Order order by Order_ID)"
		connection.query(query, (err, data) => {
			if (err) {
				throw err
			} else {
			}
			for (let i = 0; i < data.length; i++) {
				customers.push(data[i]);
			}
			// console.log("customers here")
			// console.log(customers)
			for (let i = 0; i < rows.length; i++) {
				orders.push(rows[i]);
			}
			// console.log("ORDERSSSSS")
			// console.log(orders)
			var query = "SELECT Payment_Mode, DATE_FORMAT(Payment_Date, '%d/%m/%y') \"Payment_Date\" FROM Payment order by Order_ID "
			connection.query(query, (err, data) => {
				if (err) {
					throw err
				} else {
				}
				for (let index = 0; index < data.length; index++) {
					payment.push(data[index])
				}
				console.log(data)
				console.log(payment)

				var query = "SELECT Item_ID,Type,Price FROM Inventory WHERE Item_ID IN ( SELECT Item_ID FROM Order_List GROUP BY Order_ID)";
				connection.query(query, (err, data) => {
					if (err) {
						throw err
					} else {
					}
					for (let index = 0; index < data.length; index++) {
						order_item.push(data[index])
					}
					console.log(order_item)
					res.render('dashboard', { orders: orders, customers: customers, payment: payment, order_item: order_item });
				})

			})

			console.log(rows)

		})

	})
	// res.render('dashboard', { orders: orders, customers: customers, payment: payment, order_item: order_item });
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
		}
	})
	res.redirect('/ad-customer.html');
	// console.log(post)
});

app.post('/ad-orders.html', (req, res) => {
	var oid = req.body.oid;
	var odate = req.body.odate;
	var add = req.body.add;
	var cid = req.body.cid;
	var iid = req.body.iid;
	var amt = req.body.amt;
	var paymode = req.body.paymode;
	var pdate = req.body.pdate;
	var status = 'Pending';
	var sql = "insert into orders set ?"
	let o_post = { Order_ID: oid, Order_Date: odate, Amount: amt, Delivery_Address: add, Order_Status: status }
	let ol_post = { Order_ID: oid, Item_ID: iid }
	let co_post = { Customer_ID: cid, Order_ID: oid }
	let pay_post = { Order_ID: oid, Amount: amt, Payment_Mode: paymode, Payment_Date: pdate }

	connection.query(sql, o_post, (err, rows) => {
		if (err) {
			throw err;
		} else {
			console.log(rows);
		}
	});

	var sql = "insert into order_list set ?"

	connection.query(sql, ol_post, (err, rows) => {
		if (err) {
			throw err;
		} else {
			console.log(rows);
		}
	});

	var sql = "insert into customer_order set ?"

	connection.query(sql, co_post, (err, rows) => {
		if (err) {
			throw err;
		} else {
			console.log(rows);
		}
	});

	var sql = "insert into payment set ?"

	connection.query(sql, pay_post, (err, rows) => {
		if (err) {
			throw err;
		} else {
			console.log(rows);
		}
	});
	res.redirect('/ad-orders.html');
})

app.post('/category.html', (req, res) => {
	items = [];
	var range = req.body.range;
	var condition = req.body.condition;
	var sort = req.body.sort;
	var values = range.split(',');
	if (sort === 'Lowest Price') {
		var sql = "select * from inventory where (Price between " + values[0] + " and " + values[1] + ") and Item_Condition = " + "'" + condition + "'" + " order by Price";	
	} else {
		var sql = "select * from inventory where (Price between " + values[0] + " and " + values[1] + ") and Item_Condition = " + "'" + condition + "'" + " order by Price desc";
	}
	
	console.log(sql);
	connection.query(sql, (err, rows) => {
		if (err) {
			throw err
		} else {
			for (let index = 0; index < rows.length; index++) {
				items.push(rows[index]);
			}
		}
		res.render('category', { inventory: items });
	})

})


app.listen(5000, function () {
	console.log("Started");
});