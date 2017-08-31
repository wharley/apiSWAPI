import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { save, change, refresh } from '../actions/swapiActions'

class SwapiForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			swapi: {}
		}

		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(e) {
		e.preventDefault()

		const swapi = this.state.swapi

		swapi[e.target.name] = e.target.value
		this.setState({...this.state, swapi})

	}
	componentWillMount() {
		this.props.refresh()
	}
	componentWillReceiveProps(nextProps) { 
		const { swapi } = nextProps.swapi
		if(swapi) {
			this.setState({swapi: swapi})
		}

	}
	render() {
		const { save, refresh } = this.props

		return (
			<div role="form" className="swapiForm">
				<Grid cols="12 9 10">
					<input className="form-control" name="id" value={this.state.swapi.id} disabled />

					<input className="form-control" placeholder="Title" name="title"
						onChange={this.handleChange} 
						value={this.state.swapi.title}></input>

					<input className="form-control" placeholder="Episode" name="episode_id"
						onChange={this.handleChange}
						value={this.state.swapi.episode_id}></input>

					<textarea className="form-control" placeholder="Opening" name="opening_crawl"
						onChange={this.handleChange}
						value={this.state.swapi.opening_crawl}></textarea>

					<input className="form-control" placeholder="Director" name="director"
						onChange={this.handleChange}
						value={this.state.swapi.director}></input>

					<input className="form-control" placeholder="Producer" name="producer"
						onChange={this.handleChange}
						value={this.state.swapi.producer}></input>				
				</Grid>
				<Grid cols="12 3 2">
					<IconButton style="primary" icon="save" onClick={() => this.props.save(this.state.swapi, this.props.swapi.add)}></IconButton>
				</Grid>
			</div>			
		)
	}
}

const mapStateToProps = state => ({swapi: state.swapi})
const mapDispatchToProps = dispatch => 
    bindActionCreators({ save, change, refresh}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SwapiForm)