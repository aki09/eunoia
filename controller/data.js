var items = [];
var customers = [];
var orders = [];
var payment = [];
var order_item = [];
var recent_item = [];

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

exports.getIndex = (req, res, next) => {
    var cust = 1;
    var cate = 1;
    var ord = 1;
    var sql = 'SELECT ( SELECT COUNT(*) FROM Customers ) AS count1, ( SELECT COUNT(*) FROM Inventory ) AS count2, ( SELECT COUNT(*) FROM Orders ) AS count3 FROM dual';
    connection.query(sql, (err, data) => {
        if (err) {
        } else {
        }
        cust = data[0]['count1'];
        cate = data[0]['count2'];
        ord = data[0]['count3'];
    })
    recent_item = [];
    sql = 'SELECT * FROM Inventory ORDER BY Item_ID DESC LIMIT 5';
    connection.query(sql, (err, rows) => {
        if (err) {
            throw err;
        } else {
        }
        for (let index = 0; index < rows.length; index++) {
            recent_item.push(rows[index]);      
        }
        res.render('index', { items: recent_item, customer_count: cust, item_count: cate, order_count: ord });
    })
}

exports.getInvetory = (req, res) => {
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
}

exports.getCustomer = (req, res) => {
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
    //  res.render('customers', { customers: customers });
}

exports.getOrders = (req, res) => {
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
    //  res.render('dashboard', { orders: orders, customers: customers, payment: payment, order_item: order_item });
}