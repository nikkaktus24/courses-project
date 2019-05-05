const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.post('/auth/login', (req, res, next) => {
		let users = server.db.getState().users,
			matchedUser = users.find((user) => {
				console.log(user);
				return user.login.toUpperCase() === req.body.login.toUpperCase();
			});

		if(!matchedUser) {
			res.status(401).send('Wrong username or password');
		} else if(matchedUser.password === req.body.password) {
			res.json({ token: matchedUser.fakeToken});
		} else {
			res.status(401).send("Wrong username or password");
		}
	});
		
	router.post('/auth/userinfo', (req, res, next) => {
		let users = server.db.getState().users,
			matchedUser = users.find((user) => {
				return user.fakeToken === req.body.token;//('Authorization');
			});
			
		if(!matchedUser) {
			res.status(401).send('Unauthorized');
		} else {
			res.json(matchedUser);
		}
	});

	router.patch('/auth/user/update', (req, res, next) => {
		const users = server.db.getState().users;
		const newModel = req.body;
		return users.map((item) => {
			if (item.id === newModel.id) {
				return {
					...item,
					...newModel,	
				}
			}
		})
	});

	router.patch('/auth/user/coins', (req, res, next) => {
		const users = server.db.getState().users;
		const coinsModel = req.body;
		return users.map((item) => {
			if (item.id === newModel.id) {
				return {
					...item,
					coins: coinsModel.coins,	
				}
			}
		})
	});

	return router;
};
