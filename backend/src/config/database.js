'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize) => {

	const Swapi = sequelize.define('Swapi', {
		name: Sequelize.STRING
	})

	return {
		Swapi: Swapi
	}

}