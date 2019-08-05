import {
	SET_USER,
	DELETE_USER
} from '../actions/actionsTypes'

const initialState = {
	user: null
}

export const userReducer = (state = initialState, { type, user }) => {
	if (type === SET_USER) return { user }

	if (type === DELETE_USER) return initialState

	return state
}