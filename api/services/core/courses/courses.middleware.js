const express = require('express');
const router = express.Router();
const url = require('url');
const moment = require('moment');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start || 0,
			to = +query.start + +query.count,
			sort = query.sort,
			queryStr = query.query,
			filter = query.filter,
			id = query.id,
			courses = server.db.getState().courses;
		
			if (!!query.textFragment) {
				courses = courses.filter((course) => course.name.concat(course.description).toUpperCase().indexOf(query.textFragment.toUpperCase()) >= 0);
			}
		
		if(sort) {
			courses.sort((a, b) => {
				if (sort === 'date') {
					const c = moment(b.date);
					const d = moment(a.date);
					return c.valueOf() - d.valueOf();
				} else {
					return b[sort] - a[sort];
				}
			});
		}
		
		if (courses.length < to || !to) {
			to = courses.length;
		}
		
		if(!id) {
			courses = courses.slice(from, to);
		} else {
			courses = courses.filter((item) => {
				return item.id == id;
			});
		}
		
		res.json(courses);
	});

	router.post('/courses/order', (req, res, next) => {
		const url_parts = url.parse(req.originalUrl, true);
		const courses = server.db.getState().courses;
		const users = server.db.getState().users;

		const user = users.filter((user) => user.id === req.body.userId)[0];
		user.courses = [...user.courses, ...req.body.courses];
		user.coins = user.coins - req.body.cost;

		res.json(user);
	});
	
	return router;
};
