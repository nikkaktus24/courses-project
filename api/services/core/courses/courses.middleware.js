const express = require('express');
const router = express.Router();
const url = require('url');

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
		
			if (!!query.textFragment && !query.filter) {
				courses = courses.filter((course) => course.name.concat(course.description).toUpperCase().indexOf(query.textFragment.toUpperCase()) >= 0);
			}

			if (!!query.textFragment && query.filter) {
				courses = courses.filter((course) => course[query.filter].toUpperCase().indexOf(query.textFragment.toUpperCase()) >= 0);
			}
		
		if(sort) {
			courses.sort((a, b) => {
				const c = new Date(Date.parse(b.date));
				const d = new Date(Date.parse(a.date));
				return c.valueOf() - d.valueOf();
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
	
	return router;
};
