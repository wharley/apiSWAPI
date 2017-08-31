import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import SwapiForm from './swapiForm'
import SwapiList from './swapiList'

const URL = 'http://localhost:3003/api/v1/swapi'

export default class Swapi extends Component {	
	constructor(props) {
		super(props)
		this.state = {
			director: '',
			title: '',
			episode_id: '',
			opening_crawl: '',
			producer: '',
			list: []
		}

		this.handleSave = this.handleSave.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleRemove = this.handleRemove.bind(this)
		this.handleEdit = this.handleEdit.bind(this)

	}
	componentWillMount() {
		this.refresh()
	}
	refresh() {
		axios.get(URL)
			.then(resp => this.setState({...this.state, list: resp.data}))
	}
	handleChange(e) {
		this.setState({...this.state, [e.target.name]: e.target.value})
	}
	handleRemove(swapi) {
		axios.delete(`${URL}/${swapi.id}`)
		 	.then(resp => this.refresh(this.state.director))
	}
	handleEdit(swapi) {
		this.setState({
			...this.state,
			id: swapi.id,
			director: swapi.director,
			title: swapi.title,
			episode_id: swapi.episode_id,
			opening_crawl: swapi.opening_crawl,
			producer: swapi.producer
		})
	}
	handleSave(e) {
		axios.put(URL, {...this.stateswapi})
			.then(resp => this.refresh(this.state.director))
	}
	render() {
		return (
			<div>
				<PageHeader name="Swapis" small="Register" />
				<SwapiForm director={this.state.director}
						   id={this.state.id}
						   title={this.state.title} 
						   episode_id={this.state.episode_id}
						   opening_crawl={this.state.opening_crawl}
						   producer={this.state.producer}
				           handleSave={this.handleSave}
				 	       handleChange={this.handleChange} />
				<SwapiList list={this.state.list} 
					       handleRemove={this.handleRemove} 
					       handleEdit={this.handleEdit} />
			</div>
		)
	}
}