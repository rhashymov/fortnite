import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk from "redux-thunk"
import reducer from './reducer'
import searchReducer from './searchReducer'

let reducers = combineReducers({
    cosmetics: reducer,
    search: searchReducer
})

const store = legacy_createStore(reducers, applyMiddleware(thunk))

window.store = store
export default store