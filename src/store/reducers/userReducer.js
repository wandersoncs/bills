import { SIGN_IN_USER, SIGN_OUT_USER } from '../actions/actions-types'

const initialState = {
	user: null
}

export const userReducer = (state = initialState, { type, user }) => {
	if (type === SIGN_IN_USER) return { user }

	if (type === SIGN_OUT_USER) return initialState

	return state
}