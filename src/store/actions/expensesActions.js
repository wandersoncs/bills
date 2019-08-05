import {
	LOAD_EXPENSES,
	CREATE_EXPENSE,
	DELETE_EXPENSE,
	UPDATE_EXPENSE,
	CREATE_EXPENSE_ERROR,
	UPDATE_EXPENSE_ERROR,
	DELETE_EXPENSE_ERROR,
	LOAD_EXPENSES_ERROR
} from './actionsTypes'

const createExpense = expense => async (dispatch, getState, firebase) => {
	const { userReducer } = getState()

	try {
		const { id } = await firebase.firestore().collection('expenses')
			.add({ ...expense, userId: userReducer.user.uid })

		dispatch({
			type: CREATE_EXPENSE,
			payload: { ...expense, id }
		})
	} catch (error) {
		dispatch({
			type: CREATE_EXPENSE_ERROR,
			error: error
		})
	}
}

const updateExpense = (id, expense) => async (dispatch, getState, firebase) => {
	const { userReducer } = getState()

	try {
		const doc = await firebase.firestore().collection('expenses').doc(id)

		await doc.update({ ...expense, userId: userReducer.user.uid })
		dispatch({
			type: UPDATE_EXPENSE,
			payload: { ...expense, id }
		})
	} catch (error) {
		dispatch({
			type: UPDATE_EXPENSE_ERROR,
			payload: error
		})
	}
}

const deleteExpense = id => async (dispatch, getState, firebase) => {
	try {
		const doc = await firebase.firestore().collection('expenses').doc(id)

		await doc.delete()

		dispatch({
			type: DELETE_EXPENSE,
			payload: { id }
		})
	} catch (error) {
		dispatch({
			type: DELETE_EXPENSE_ERROR,
			payload: error
		})
	}
}

const loadExpenses = () => async (dispatch, getState, firebase) => {
	const { userReducer } = getState()

	try {
		const queryResult = await firebase.firestore().collection('expenses').where('userId', '==', userReducer.user.uid).get()
		const payload = []

		queryResult.forEach(snapshot => {
			payload.push({ ...snapshot.data(), id: snapshot.id })
		})

		dispatch({
			type: LOAD_EXPENSES,
			payload: payload
		})
	} catch (error) {
		dispatch({
			type: LOAD_EXPENSES_ERROR,
			payload: error
		})
	}
}

export {
	createExpense,
	updateExpense,
	deleteExpense,
	loadExpenses
}