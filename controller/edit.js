const mysql = require("mysql");
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

exports.addInventory = (req, res) => {
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
}

exports.addCustomer = (req, res) => {
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
}

exports.addOrder = (req, res) => {
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
            
        }
    });

    var sql = "insert into order_list set ?"

    connection.query(sql, ol_post, (err, rows) => {
        if (err) {
            throw err;
        } else {
            
        }
    });

    var sql = "insert into customer_order set ?"

    connection.query(sql, co_post, (err, rows) => {
        if (err) {
            throw err;
        } else {
            
        }
    });

    var sql = "insert into payment set ?"

    connection.query(sql, pay_post, (err, rows) => {
        if (err) {
            throw err;
        } else {
           
        }
    });
    res.redirect('/ad-orders.html');
}

exports.filterInventory = (req, res) => {
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
}

exports.editCustomer = (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var num = req.body.num;
    var state = req.body.state;
    var email = req.body.email;
    var ig = req.body.ig;
    var add = req.body.add;
    let sql = "UPDATE Customers SET ? WHERE Customer_ID = " + id;
    let post = { Name: name, Instagram_Handle: ig, Address: add, State: state, Contact: num, Email_ID: email }
    connection.query(sql, post, (err, rows) => {
        if (err) {
            throw err
        } else {
        }
        res.redirect('/customer.html')
    })
}

exports.getEditCustomer = (req, res) => {
    const custId = req.params.id;
	console.log('Customer ID');
	console.log(custId);
	let sql = 'select * from customers where Customer_ID = ' + custId;
	const customer = [];
	connection.query(sql, (err, rows) => {
		if (err) {
			throw err
		} else {
		}
		
		res.render('edit-customer', {customer: rows});
	})
}

exports.getEditInventory = (req, res) => {
    const id = req.params.id;
    let sql = 'select * from inventory where Item_ID = ' + id;
    const item = [];
	connection.query(sql, (err, rows) => {
		if (err) {
			throw err
		} else {
		}
		console.log(rows)
		res.render('edit-inventory', {item: rows});
	})
}

exports.editInventory = (req, res) => {
    var id = req.body.id;
    var type = req.body.type;
    var status = req.body.status;
    var ig = req.body.ig;
    var condition = req.body.condition;
    var price = req.body.price;
    let sql = "UPDATE Inventory SET ? WHERE Item_ID = " + id;
    let post = { Type: type, Status: status, Price: price, Item_Condition: condition, IG_Link: ig }
    connection.query(sql, post, (err, rows) => {
        if (err) {
            throw err
        } else {
        }
        res.redirect('/category.html')
    })
}