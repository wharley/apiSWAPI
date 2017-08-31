const INITIAL_STATE = { 
    swapi: {
        id: '',
        director: '',
        title: '',
        episode_id: '',
        opening_crawl: '',
        producer: ''
    },
    list: [] ,
    add: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TODO_CLEAR':
            return { 
                ...state, 
                swapi: {
                    id: '',
                    director: '',
                    title: '',
                    episode_id: '',
                    opening_crawl: '',
                    producer: ''                    
                }, 
                add: false 
            }        
        case 'SWAPI_SEARCHED':
            return { 
                ...state, 
                list: action.payload }
        case 'UPDATE':
            return { 
                ...state,
                swapi: {
                    id: action.payload.id,
                    director: action.payload.director,
                    title: action.payload.title,
                    episode_id: action.payload.episode_id,
                    opening_crawl: action.payload.opening_crawl,
                    producer: action.payload.producer
                },
                add: action.payload.producer
            }
        default:
            return state
    }
}