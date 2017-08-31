const INITIAL_STATE = { 
    swapi: {
        id: '',
        director: '',
        title: '',
        episode_id: '',
        opening_crawl: '',
        producer: '',
    },
    list: [] 
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
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
                } 
            }
        default:
            return state
    }
}