import {
	CREATE_EXPENSE,
	CREATE_INCOME,
	DELETE_EXPENSE,
	DELETE_INCOME,
	UPDATE_EXPENSE,
	UPDATE_INCOME,
	SIGN_IN_USER,
	SIGN_OUT_USER
} from './actions-types'

export const createExpense = transaction => ({
	type: CREATE_EXPENSE,
	transaction
})

export const updateExpense = transaction => ({
	type: UPDATE_EXPENSE,
	transaction
})

export const deleteExpense = transaction => ({
	type: DELETE_EXPENSE,
	transaction
})

export const createIncome = transaction => ({
	type: CREATE_INCOME,
	transaction
})

export const updateIncome = transaction => ({
	type: UPDATE_INCOME,
	transaction
})

export const deleteIncome = transaction => ({
	type: DELETE_INCOME,
	transaction
})

export const signInUser = user => ({
	type: SIGN_IN_USER,
	user
})

export const signOutUser = user => ({
	type: SIGN_OUT_USER,
	user
})