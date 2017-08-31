import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Swapi from '../swapis/swapi'
import About from '../about/about'

export default props => (
	<Router history={hashHistory}>
		<Route path='/swapis' component={Swapi} />
		<Route path='/about' component={About} />
		<Redirect from='*' to='/swapis' />
	</Router>

)