const path = require('path');
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const adminController = require("./controller/admin");
const dataController = require("./controller/data");
const editController = require("./controller/edit");
const errorController = require("./controller/error");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', dataController.getIndex);

app.get('/index.html', dataController.getIndex);

app.get('/login.html', adminController.getLogin);

app.get('/blog.html', adminController.getBlog);

app.get('/user-profile.html',adminController.getUserProfile);

app.get('/ad-listing.html', adminController.getAddProduct);

app.get('/ad-orders.html', adminController.getAddOrder);

app.get('/ad-customer.html', adminController.getAddCustomer);

app.get('/about-us.html', adminController.getAboutUs);

app.get('/category.html', dataController.getInvetory);

app.get('/customer.html', dataController.getCustomer);

app.get('/dashboard.html', dataController.getOrders);

app.post('/ad-listing.html', editController.addInventory);

app.post('/ad-customer.html', editController.addCustomer);

app.post('/ad-orders.html', editController.addOrder);

app.post('/category.html', editController.filterInventory);

app.get('/edit-customer.html/:id', editController.getEditCustomer);

app.post('/edit-customer.html', editController.editCustomer);

app.get('/edit-inventory.html/:id', editController.getEditInventory);

app.post('/edit-inventory.html', editController.editInventory);

app.get('/edit-orders.html/:id', editController.getEditOrder);

app.post('/dashboard.html', editController.deleteOrderItem);

app.post('/edit-orders.html', editController.EditOrder);

app.use(errorController.get404);

app.listen(5000, function () {
	console.log("Started");
});