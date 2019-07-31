import { combineReducers } from 'redux'
import { expensesReducer } from './expensesReducer'
import { incomesReducer } from './incomesReducer'

export const Reducers = combineReducers({
	expensesReducer,
	incomesReducer
})