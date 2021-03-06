import axios from 'axios'
import { toastr } from 'react-redux-toastr'

const URL = 'http://localhost:3003/api/v1/swapi'

export const save = (swapi, action) => { 

    const method = action ? 'put' : 'post'

    return dispatch => {
        axios[method](URL, swapi)
            .then(resp => {            	
            	dispatch(clear())
            })
            .catch(err => toastr.error('Erro', err))
    }
}

export const remove = (swapi) => {
    return dispatch => {
        axios.delete(URL, {params: { id: swapi.id} })
            .then(resp => dispatch(refresh()))
    }
}

export const refresh = () => {
    return (dispatch) => {
        const request = axios.get(URL,)
            .then(resp => dispatch({type: 'SWAPI_SEARCHED', payload: resp.data}))
    }
}

export const edit = (swapi) => ({		
		type: 'UPDATE', 
		payload: {
			id: swapi.id,
			director: swapi.director,
			title: swapi.title,
			episode_id: swapi.episode_id,
			opening_crawl: swapi.opening_crawl,
			producer: swapi.producer,
            add: true
		}
})

export const clear = () => {
    return [{ type: 'TODO_CLEAR' }, refresh()]
}