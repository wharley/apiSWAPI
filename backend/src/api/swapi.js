'use strict'

const axios = require('axios')

async function save(sequelize) {

	const model = require('../config/database')(sequelize)
	const swapi = await model.Swapi.findAll()

	if(!swapi[0]) {

		const data = await axios.get('https://swapi.co/api/films/')
		await Promise.all(data.data.results.map(async (code) =>  await model.Swapi.create(code) ))

		return true
	}else{
		return true
	}
}

const consumeSwapi = async (sequelize) => {

	return await save(sequelize)
}

module.exports = { consumeSwapi }