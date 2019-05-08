const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/auth/copy', (req, res, next) => {
		server.db.__wrapped__.users = server.db.__wrapped__.userscopy;
		res.status(200);
	});

	router.post('/auth/login', (req, res, next) => {
		let users = server.db.getState().users,
			matchedUser = users.find((user) => {
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

	router.put('/auth/join', (req, res, next) => {
		const users = server.db.getState().users;
		const newUser = req.body;
	
		const newModel =
		{
			id: users.length + 1,
			fakeToken: generateToken(24),
			"name": {
			  "first": newUser.firstName,
			  "last": newUser.lastName
			},
			"courses": [],
			"login": newUser.login,
			"coins": 1000,
			"password": newUser.password,
			"isAdmin": false,
			isOwner: false,
		  };

		  users.push(newModel);
		  res.json({ token: newModel.fakeToken});
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

	router.patch('/auth/user/adminflag', (req, res, next) => {
		const users = server.db.getState().users;
		const adminModel = req.body;
		return users.map((item) => {
			if (item.id === newModel.id) {
				return {
					...item,
					isAdmin: adminModel.isAdmin,	
				}
			}
		})
	});

	router.get('/auth/users', (req, res, next) => {
		let users = server.db.getState().users;
		users = users
			.filter((item) => item.login !== 'owner')
			.map((item) => ({
					id: item.id,
					login: item.login,
					name: item.name,
					coins: item.coins,
					isAdmin: item.isAdmin,
				}));

		res.json(users);
	});

	return router;
};

function generateToken(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
