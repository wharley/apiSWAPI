'use strict'

module.exports = (sequelize) => {
    const model = require('../config/database')(sequelize)
    const Swapi = model.Swapi

    return {
		create: (req, res) => {
		    Swapi.create(req.body).then( () => {
				res.json(true)
		    })
		},
		get: (req, res) => {
		    Swapi.findAll().then( teste => {
				res.json(teste)
		    })
		},
		delete: (req, res) => {
			Swapi.destroy({
				where: req.body
			}).then( data => {
				res.json(true)
			})
		}
    }
}