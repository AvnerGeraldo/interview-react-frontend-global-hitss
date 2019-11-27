import { combineReducers } from 'redux'

//Reducers
import playersReducer from './players'
import roundReducer from './round'

export default combineReducers({
	playersReducer,
	roundReducer
})