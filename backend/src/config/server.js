'use strict'

const port = 3003
const urlApi = '/api/v1/swapi'

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const Sequelize = require('sequelize')
const path = require('path')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)

const sequelize = new Sequelize({
	dialect: 'sqlite', 
	storage: path.join(__dirname, '../db/swapi.sqlite'), 
	logging: false
})

const swapiService= require('../api/swapiService')(sequelize)

sequelize.sync().then( () =>  {    
    server.get(urlApi, swapiService.get)
    server.post(urlApi, swapiService.create)
    server.delete(urlApi, swapiService.delete)

    server.listen(port, () => {
		console.log(`BACKEND is running on port ${port}. `)
	})
})
