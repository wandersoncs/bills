import { combineReducers } from 'redux'
import { expensesReducer } from './expensesReducer'
import { incomesReducer } from './incomesReducer'
import { userReducer } from './userReducer'

export const reducers = combineReducers({
	expensesReducer,
	incomesReducer,
	userReducer
})