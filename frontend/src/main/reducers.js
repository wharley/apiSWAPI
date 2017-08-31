import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'

import swapiReducer from '../reducers/swapiReducers'

const rootReducer = combineReducers({
    swapi: swapiReducer,
    toastr: toastrReducer   
})

export default rootReducer