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
    var amt = 0;
    var paymode = req.body.paymode;
    var pdate = req.body.pdate;
    var status = 'Pending';


    var sql = "select Price from inventory where Item_ID in (" + iid + ")";
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
        }
        for (let index = 0; index < rows.length; index++) {
            amt = amt + rows[index]['Price'];
        }
        console.log('amt1')
        console.log(amt);

        console.log(amt);

        var sql = "insert into orders set ?"
        let o_post = { Order_ID: oid, Order_Date: odate, Amount: amt, Delivery_Address: add, Order_Status: status }
        let co_post = { Customer_ID: cid, Order_ID: oid }
        let pay_post = { Order_ID: oid, Amount: amt, Payment_Mode: paymode, Payment_Date: pdate }

        connection.query(sql, o_post, (err, rows) => {
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

        for (let index = 0; index < iid.length; index++) {
            let ol_post = { Order_ID: oid, Item_ID: iid[index] }
            var sql = "insert into order_list set ?"

            connection.query(sql, ol_post, (err, rows) => {
                if (err) {
                    throw err;
                } else {

                }
            });

        }

        res.redirect('/ad-orders.html');
    })
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

        res.render('edit-customer', { customer: rows });
    })
    // res.render('edit-customer', { customer: rows });
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
        res.render('edit-inventory', { item: rows });
    })
    // res.render('edit-inventory', { item: rows });
}

exports.editInventory = (req, res) => {
    var id = req.body.id;
    var type = req.body.type;
    var status = req.body.status;
    var ig = req.body.ig;
    var condition = req.body.condition;
    var price = req.body.price;
    var old_price = req.body.old_price;
    var amt = old_price - price;
    var sql = "UPDATE Inventory SET ? WHERE Item_ID = " + id;
    let post = { Type: type, Status: status, Price: price, Item_Condition: condition, IG_Link: ig }
    connection.query(sql, post, (err, rows) => {
        if (err) {
            throw err
        } else {
        }
        sql = "UPDATE Orders set Amount = Amount - " + amt;
        connection.query(sql, (err, rows) => {
            if (err) {

            }
            res.redirect('/category.html')
        });
    })
}

exports.deleteOrderItem = (req, res) => {
    var id = req.body.id;
    var oid = parseInt(req.body.oid);
    var amt = req.body.amt;
    var sql = "UPDATE Orders set Amount = Amount - " + amt + " where Order_ID = " + oid;
    connection.query(sql, (err, rows) => {
        if (err) {

        }
    });

    sql = "Delete from Order_List where Item_ID = " + id;
    connection.query(sql, (err, rows) => {
        if (err) {

        }
        res.redirect('/dashboard.html')
    })

}

exports.getEditOrder = (req, res) => {
    var id = req.params.id;
    var sql = 'SELECT o.Order_ID, DATE_FORMAT(o.Order_Date, \'%d/%m/%y\') "Order_Date",o.Amount,o.Delivery_Address,o.Order_Status,c.Name,p.Payment_Mode,DATE_FORMAT(p.Payment_Date, \'%d/%m/%y\') "Payment_Date" FROM Orders o, Customer_Order co, Customers c, Payment p WHERE o.Order_ID = ' + id + ' AND o.Order_ID = co.Order_ID AND co.Customer_ID=c.Customer_ID AND (o.Order_ID=p.Order_ID)';
    connection.query(sql, (err, rows) => {
        if (err) {
            throw err
        } else {
        }
        res.render('edit-orders', { order: rows });
    })
    // res.render('edit-orders', { order: rows });
}

exports.EditOrder = (req, res) => {
    var oid = parseInt(req.body.oid);
    var add = req.body.add;
    var iid = req.body.iid;
    var mode = req.body.paymode;
    var amt = parseInt(req.body.amt);
    var status = req.body.status;

    var sql = "select Price from inventory where Item_ID in (" + iid + ")";
    connection.query(sql, (err, rows) => {
        if (iid.length > 0) {
            for (let index = 0; index < rows.length; index++) {
                amt = amt + rows[index]['Price'];
            }
        }
        sql = 'UPDATE Orders set ? ' + 'where Order_ID = ' + oid;
        post = { Delivery_Address: add, Amount: amt , Order_Status: status}
        connection.query(sql, post, (err, rows) => {
            if (err) {
                throw err;
            } else {

            }
            sql = "UPDATE Payment set ?" + 'where Order_ID = ' + oid;
            var p_post = { Payment_Mode: mode }
            connection.query(sql, p_post, (err, rows) => {
                if (err) {
                    throw err
                }
                if (iid.length > 0) {
                    for (let index = 0; index < iid.length; index++) {
                        let ol_post = { Order_ID: oid, Item_ID: iid[index] }
                        sql = "insert into order_list set ?"

                        connection.query(sql, ol_post, (err, rows) => {
                            if (err) {
                                throw err;
                            } else {

                            }
                            res.redirect('/dashboard.html');
                        });

                    }
                }
                res.redirect('/dashboard.html');

            });

        });
    })
}