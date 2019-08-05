import {
	CREATE_INCOME,
	UPDATE_INCOME,
	DELETE_INCOME,
	LOAD_INCOMES
} from '../actions/actions-types'

const initialState = {
	incomes: [],
	loading: true
}

export const incomesReducer = (state = initialState, { type, payload }) => {
	const incomes = state.incomes

	switch (type) {
		case LOAD_INCOMES:
			return {
				incomes: payload,
				loading: false
			}
		case CREATE_INCOME:
			return {
				incomes: incomes.concat([payload]),
				loading: false
			}
		case UPDATE_INCOME:
			const index = incomes.findIndex(({ id }) => id === payload.id)

			if (index === -1) return { ...state }

			incomes[index] = payload
			return {
				incomes: [].concat(incomes),
				loading: false
			}
		case DELETE_INCOME:
			return {
				incomes: incomes.filter(({ id }) => id !== payload.id),
				loading: false
			}
		default:
			return { ...state }
	}
}
