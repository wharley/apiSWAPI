'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize) => {

	const Swapi = sequelize.define('Swapi', {
		title: { type: Sequelize.STRING },
		episode_id: { type: Sequelize.INTEGER },
		opening_crawl: { type: Sequelize.STRING },
		director: { type: Sequelize.STRING },
		producer: { type: Sequelize.STRING }
	})

	return {
		Swapi: Swapi
	}

}