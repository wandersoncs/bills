import { CREATE_INCOME, UPDATE_INCOME, DELETE_INCOME } from '../actions/actions-types'

const initialState = {
	incomes: []
}

export const incomesReducer = (state = initialState, { type, transaction }) => {
	const incomes = state.incomes

	switch (type) {
		case CREATE_INCOME:
			return {
				incomes: incomes.concat([transaction])
			}
		case UPDATE_INCOME:
			const index = incomes.findIndex(({ id }) => id === transaction.id)

			if (index === -1) return { ...state }

			incomes[index] = transaction

			return {
				incomes
			}
		case DELETE_INCOME:
			return {
				incomes: incomes.filter(({ id }) => id !== transaction.id)
			}
		default:
			return { ...state }
	}
}
