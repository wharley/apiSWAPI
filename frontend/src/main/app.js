import '../template/custom.css'

import React from 'react'
import Menu from '../template/menu'
import Routes from './routes'

import Messages from '../template/messages'

export default props => (
	<div className="container-fluid">
		<Menu />
		<Routes />
		<Messages />
	</div>
)