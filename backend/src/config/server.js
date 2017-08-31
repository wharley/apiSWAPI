'use strict'

const port = 3003
const urlApi = '/api/v1/swapi'

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')
const { consumeSwapi } = require('../api/swapi')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)

const sequelize = new Sequelize({
	dialect: 'sqlite', 
	storage: path.join(__dirname, '../db/swapi.sqlite'), 
	logging: false
})

const swapiService = require('../api/swapiService')(sequelize)

async function fileExists() {

	if(!fs.existsSync(path.join(__dirname, '../db/'))) {
		await fs.mkdirSync(path.join(__dirname, '../db/'))	
	}

	sequelize.sync().then( async () =>  { 

		await consumeSwapi(sequelize)

	    server.get(urlApi, swapiService.get)
	    server.post(urlApi, swapiService.create)
	    server.put(urlApi, swapiService.update)
	    server.delete(urlApi, swapiService.delete)

	    server.listen(port, () => {
			console.log(`BACKEND is running on port ${port}. `)
		})
	})	
}

fileExists()