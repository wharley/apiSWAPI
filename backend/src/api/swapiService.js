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
		    Swapi.findAll({
		    	order: sequelize.col('episode_id')
		    }).then( swapi => {
				res.json(swapi)
		    })
		},
		delete: (req, res) => {
			Swapi.destroy({
				where: req.query
			}).then( data => {
				res.json(true)
			})
		},
		update: (req, res) => {
			Swapi.update(req.body, {
				where: {
					id: req.body.id
				}
			}).then( () => {
				res.json(true)
			})
		}
    }
}