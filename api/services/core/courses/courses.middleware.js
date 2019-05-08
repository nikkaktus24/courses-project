const express = require('express');
const router = express.Router();
const url = require('url');
const moment = require('moment');
const _ = require('lodash');

module.exports = (server) => {

	router.get('/ordered', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start || 0,
			to = +query.start + +query.count,
			sort = query.sort,
			queryStr = query.query,
			filter = query.filter,
			id = query.id,
			courses = server.db.getState().courses;
		const users = server.db.getState().users;
		const user = users.filter((user) => user.id == query.userId)[0];
		let userCourses = _.filter(courses, (item) => _.find(user.courses, (course) => course === item.id));
		
			if (!!query.textFragment) {
				userCourses = userCourses.filter((course) => course.name.concat(course.description).toUpperCase().indexOf(query.textFragment.toUpperCase()) >= 0);
			}
		
		if(sort) {
			userCourses.sort((a, b) => {
				if (sort === 'date') {
					const c = moment(b.date);
					const d = moment(a.date);
					return c.valueOf() - d.valueOf();
				} else {
					return b[sort] - a[sort];
				}
			});
		}
		
		if (userCourses.length < to || !to) {
			to = userCourses.length;
		}
		
		if(!id) {
			userCourses = courses.slice(from, to);
		} else {
			userCourses = courses.filter((item) => {
				return item.id == id;
			});
		}
		
		res.json(userCourses);
	});

	router.get('/courses/copy', (req, res, next) => {
		server.db.__wrapped__.courses = server.db.__wrapped__.coursescopy;
		res.status(200);
	});

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
		const users = server.db.getState().users;


		const user = _.find(users, ((user) => user.id === req.body.userId));
		user.courses = [...user.courses, ...req.body.courses];
		user.coins = user.coins - req.body.cost;

		res.json(user);
	});
	
	return router;
};
