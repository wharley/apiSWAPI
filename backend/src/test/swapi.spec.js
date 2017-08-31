const nock = require('nock')
const request = require('supertest')('http://localhost:3003/api/v1/swapi')
const expect = require('chai').expect
const Sequelize = require('sequelize')
const path = require('path')
const axios = require('axios')

const sequelize = new Sequelize({
	dialect: 'sqlite', 
	storage: path.join(__dirname, '../db/Tswapi.sqlite'), 
	logging: false
})

const model = require('../config/database')(sequelize)

describe('Testando swapi', () => {
	beforeEach(done => {
		sequelize.sync().then( () => {
			done()
		})
	})

	it('Should create data', (done) => {

		nock('http://localhost:3003/api/v1/swapi')
			.defaultReplyHeaders({
		  		'Content-Type': 'application/json'
		  	})
			.post('/swapi', {
				title: 'teste title',
				episode_id: 1,
				opening_crawl: 'teste opening_crawl',
				director: 'teste director',
				producer: 'teste producer'
			})
			.reply(200, (uri, req, cb) => { 
			
				const data = JSON.parse(req)
				
				model.Swapi
					.create(data)
					.then( () => {
						cb(null, {valid: true})
					}) 
			})

			const swapis = {
				title: 'teste title',
				episode_id: 1,
				opening_crawl: 'teste opening_crawl',
				director: 'teste director',
				producer: 'teste producer'				
			}

			request
				.post('/swapi')
				.send(swapis)
				.set({'Content-Type': 'application/json'})
				.end((err, res) => {
			        expect(res.body.valid).to.true
			        done()
				})
	})

	it('Should get data', (done) => {

		nock('http://localhost:3003/api/v1/swapi')
			.defaultReplyHeaders({
		  		'Content-Type': 'application/json'
		  	})
			.get('/swapi', {
				episode_id: 1
			})
			.reply(200, (uri, req, cb) => { 
			
				const data = JSON.parse(req)
				
				model.Swapi
					.findAll()
					.then( swapi => {
						cb(null, swapi)
					}) 
			})

			const swapis = {
				episode_id: 1
			}

			request
				.get('/swapi')
				.send(swapis)
				.set({'Content-Type': 'application/json'})
				.end((err, res) => {
			        expect(res.body[0].episode_id).to.equal(1)
			        done()
				})
	})

	it('Should update data', (done) => {

		nock('http://localhost:3003/api/v1/swapi')
			.defaultReplyHeaders({
		  		'Content-Type': 'application/json'
		  	})
			.put('/swapi', {
				episode_id: 2
			})
			.reply(200, (uri, req, cb) => { 
			
				const data = JSON.parse(req)
				
				model.Swapi
					.update(data, {
						where: {
							id: 1
						}
					})
					.then( swapi => {
						cb(null, {valid: true})
					}) 
			})

			const swapis = {
				episode_id: 2
			}

			request
				.put('/swapi')
				.send(swapis)
				.set({'Content-Type': 'application/json'})
				.end((err, res) => {
			        expect(res.body.valid).to.true
			        done()
				})
	})		

	it('Should destroy data', (done) => {

		nock('http://localhost:3003/api/v1/swapi')
			.defaultReplyHeaders({
		  		'Content-Type': 'application/json'
		  	})
			.delete('/swapi')
			.reply(200, (uri, req, cb) => { 
				
				model.Swapi
					.destroy({truncate: true})
					.then( swapi => {
						cb(null, {valid: true})
					}) 
			})

			request
				.delete('/swapi')
				.send()
				.set({'Content-Type': 'application/json'})
				.end((err, res) => {
			        expect(res.body.valid).to.true
			        done()
				})
	})	

	it('Should api swapi', (done) => {

		axios.get('https://swapi.co/api/films/')
			.then( swapi => {				
				processSwapi(swapi.data)
					.then(data => {
						expect(data[0]).be.ok
						done()
					})
			})
			.catch(err => {
				done(err)
			})
	})

	it('Should get data swapi', (done) => {

		nock('http://localhost:3003/api/v1/swapi')
			.defaultReplyHeaders({
		  		'Content-Type': 'application/json'
		  	})
			.get('/swapi', {
				episode_id: 1
			})
			.reply(200, (uri, req, cb) => { 
			
				const data = JSON.parse(req)
				
				model.Swapi
					.findAll()
					.then( swapi => {
						cb(null, swapi)
					}) 
			})

			const swapis = {
				episode_id: 1
			}

			request
				.get('/swapi')
				.send(swapis)
				.set({'Content-Type': 'application/json'})
				.end((err, res) => {
					expect(res.body).to.exist
			        done()
				})
	})	

	it('Should destroy data swapi', (done) => {

		nock('http://localhost:3003/api/v1/swapi')
			.defaultReplyHeaders({
		  		'Content-Type': 'application/json'
		  	})
			.delete('/swapi')
			.reply(200, (uri, req, cb) => { 
				
				model.Swapi
					.destroy({truncate: true})
					.then( swapi => {
						cb(null, {valid: true})
					}) 
			})

			request
				.delete('/swapi')
				.send()
				.set({'Content-Type': 'application/json'})
				.end((err, res) => {
			        expect(res.body.valid).to.true
			        done()
				})
	})	
})

function processSwapi(data) {
	
	const code = data.results.map(processFilms)

	return Promise.all(code)
}

function processFilms(code) {
	
	return new Promise((resolve, reject) => {
		const swapi = {
			title: code.title,
			episode_id: code.episode_id,
			opening_crawl: code.opening_crawl,
			director: code.director,
			producer: code.producer	
		}

		model.Swapi
			.create(swapi)
			.then( () => {
				resolve(true)
			})
			.catch(err => {
				reject(err)
			})
	})
}