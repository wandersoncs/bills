import { generateUUID } from '../../utils/uuid'
import { CREATE_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../actions/actions-types'

const initialState = {
	expenses: []
}

export const expensesReducer = (state = initialState, { type, transaction }) => {
	const expenses = state.expenses

	switch (type) {
		case CREATE_EXPENSE:
			transaction.id = generateUUID()

			return {
				expenses: expenses.concat([transaction])
			}
		case UPDATE_EXPENSE:
			const index = expenses.findIndex(({ id }) => id === transaction.id)

			if (index === -1) return { ...state }

			expenses[index] = transaction

			return {
				expenses
			}
		case DELETE_EXPENSE:
			return {
				expenses: expenses.filter(({ id }) => id !== transaction.id)
			}
		default:
			return { ...state }
	}
}
