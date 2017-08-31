import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconButton from '../template/iconButton'
import { remove, edit } from '../actions/swapiActions'

const SwapiList = props => {

	const renderRows = () => {
		
		const list = props.list || []

		return list.map(swapi => (
			<tr key={swapi.id}>
			    <td>{swapi.id}</td>
				<td>{swapi.title}</td>
				<td>{swapi.episode_id}</td>
				<td>{swapi.director}</td>
				<td>{swapi.opening_crawl}</td>
				<td>{swapi.producer}</td>
				<td>
					<IconButton style="warning" icon="edit"
						onClick={() => props.edit(swapi)} />
					<IconButton style="danger" icon="trash" 
						onClick={() => props.remove(swapi)} />
				</td>
			</tr>
		))
	}

	return (
		<table className="table">
			<thead>
				<tr>
					<th>Id</th>
					<th>Title</th>
					<th>Episode</th>
					<th>Director</th>
					<th>Opening</th>
					<th>Producer</th>
					<th className="tableAction">Actions</th>
				</tr>
			</thead>
			<tbody>
				{renderRows()}
			</tbody>
		</table>
	)
}

const mapStateToProps = state => ({list: state.swapi.list})
const mapDispatchToProps = dispatch => 
    bindActionCreators({ remove, edit }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SwapiList)