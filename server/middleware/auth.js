var jwt = require('jsonwebtoken');
var RegisterUser = require('../models/registerModel');

var auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('User ', '');
		const decoded = jwt.verify(token, 'Auth system');
		const user = await RegisterUser.findOne({ _id: decoded._id, 'tokens.token': token })

		if (!user) {
			throw new Error();
		}

		req.user = user;
		next();
	} catch (err) {
		res.status(401).send({ error: 'Please login' });
	}
}

module.exports = auth;
