import {
	LOAD_INCOMES,
	CREATE_INCOME,
	DELETE_INCOME,
	UPDATE_INCOME,
	CREATE_INCOME_ERROR,
	UPDATE_INCOME_ERROR,
	DELETE_INCOME_ERROR,
	LOAD_INCOMES_ERROR
} from './actions-types'

const createIncome = income => async (dispatch, getState, firebase) => {
	const { userReducer } = getState()

	try {
		const { id } = await firebase.firestore().collection('incomes')
			.add({ ...income, userId: userReducer.user.uid })

		dispatch({
			type: CREATE_INCOME,
			payload: { ...income, id }
		})
	} catch (error) {
		dispatch({
			type: CREATE_INCOME_ERROR,
			error: error
		})
	}
}

const updateIncome = (id, income) => async (dispatch, getState, firebase) => {
	const { userReducer } = getState()

	try {
		const doc = await firebase.firestore().collection('incomes').doc(id)

		await doc.update({ ...income, userId: userReducer.user.uid })
		dispatch({
			type: UPDATE_INCOME,
			payload: { ...income, id }
		})
	} catch (error) {
		dispatch({
			type: UPDATE_INCOME_ERROR,
			payload: error
		})
	}
}

const deleteIncome = id => async (dispatch, getState, firebase) => {
	try {
		const doc = await firebase.firestore().collection('incomes').doc(id)

		await doc.delete()

		dispatch({
			type: DELETE_INCOME,
			payload: { id }
		})
	} catch (error) {
		dispatch({
			type: DELETE_INCOME_ERROR,
			payload: error
		})
	}
}

const loadIncomes = () => async (dispatch, getState, firebase) => {
	const { userReducer } = getState()

	try {
		const queryResult = await firebase.firestore().collection('incomes').where('userId', '==', userReducer.user.uid).get()
		const payload = []

		queryResult.forEach(snapshot => {
			payload.push({ ...snapshot.data(), id: snapshot.id })
		})

		dispatch({
			type: LOAD_INCOMES,
			payload: payload
		})
	} catch (error) {
		dispatch({
			type: LOAD_INCOMES_ERROR,
			payload: error
		})
	}
}

export {
	createIncome,
	updateIncome,
	deleteIncome,
	loadIncomes
}