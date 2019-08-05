import {
	CREATE_EXPENSE,
	UPDATE_EXPENSE,
	DELETE_EXPENSE,
	LOAD_EXPENSES
} from '../actions/actionsTypes'

const initialState = {
	expenses: [],
	loading: true
}

export const expensesReducer = (state = initialState, { type, payload }) => {
	const expenses = state.expenses

	switch (type) {
		case LOAD_EXPENSES:
			return {
				expenses: payload,
				loading: false
			}
		case CREATE_EXPENSE:
			return {
				expenses: expenses.concat([payload]),
				loading: false
			}
		case UPDATE_EXPENSE:
			const index = expenses.findIndex(({ id }) => id === payload.id)

			if (index === -1) return { ...state }

			expenses[index] = payload
			return {
				expenses: [].concat(expenses),
				loading: false
			}
		case DELETE_EXPENSE:
			return {
				expenses: expenses.filter(({ id }) => id !== payload.id),
				loading: false
			}
		default:
			return { ...state }
	}
}
