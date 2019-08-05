import {
	SET_USER,
	DELETE_USER
} from './actions-types'

export const setUser = user => ({
	type: SET_USER,
	user
})

export const deleteUser = () => ({
	type: DELETE_USER
})