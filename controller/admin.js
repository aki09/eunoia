exports.getLogin = (req, res, next) => {
	res.render('login');
}

exports.getUserProfile = (req, res, next) => {
    res.render('user-profile');
}

exports.getBlog = (req, res, next) => {
    res.render('blog');
}

exports.getAddProduct = (req, res) => {
	res.render('ad-listing');
}

exports.getAddOrder = (req, res) => {
	res.render('ad-orders');
}

exports.getAddCustomer = (req, res) => {
	res.render('ad-customers');
}

exports.getAboutUs = (req, res) => {
	res.render('about-us');
}