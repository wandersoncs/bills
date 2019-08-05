import React, { useEffect, useState } from 'react'
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	StatusBar,
	TouchableHighlight
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Feather'
import { toLocaleString } from 'number-locale-string'
import { loadExpenses } from '../store/actions/expensesActions'
import { loadIncomes } from '../store/actions/incomesActions'
import DonutChart from '../components/DonutChart'

const Dashboard = ({ navigation }) => {
	const [expensesAmount, setExpensesAmount] = useState(0)
	const [incomesAmount, setIncomesAmount] = useState(0)

	const expenses = useSelector(store => store.expensesReducer.expenses)
	const incomes = useSelector(store => store.incomesReducer.incomes)

	const dispatch = useDispatch()

	useEffect(() => {
		setExpensesAmount(expenses.reduce((sum, { value }) => sum + value, 0))
		setIncomesAmount(incomes.reduce((sum, { value }) => sum + value, 0))
	}, [expenses, incomes])

	useEffect(() => {
		dispatch(loadExpenses())
		dispatch(loadIncomes())
	}, [])

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#FFF' barStyle='dark-content' />

			<ScrollView>
				<View style={styles.overview}>
					<View style={styles.chartContainer}>
						<DonutChart expensesAmount={expensesAmount} incomesAmount={incomesAmount} />
					</View>

					<Text style={[styles.balance, (incomesAmount - expensesAmount > 0 ? styles.balancePositive : styles.balanceNegative)]}>
						{toLocaleString(incomesAmount - expensesAmount, 'pt-BR',
							{ style: 'currency', currency: 'brl', minimumFractionDigits: 2 })
						}
					</Text>
					<Text style={styles.balanceLabel}>Saldo</Text>
				</View>


				<View style={styles.overview}>
					<TouchableHighlight onPress={() => navigation.navigate('Expenses')} underlayColor='transparent'>
						<View style={styles.flexRow}>
							<Text style={styles.textExpense}>Despesas</Text>
							<Text style={styles.textExpense}>
								{toLocaleString(expensesAmount, 'pt-BR', { style: 'currency', currency: 'brl', minimumFractionDigits: 2 })}
							</Text>
						</View>
					</TouchableHighlight>

					<TouchableHighlight onPress={() => navigation.navigate('Incomes')} underlayColor='transparent'>
						<View style={styles.flexRow}>
							<Text style={styles.textIncome}>Receitas</Text>
							<Text style={styles.textIncome}>
								{toLocaleString(incomesAmount, 'pt-BR', { style: 'currency', currency: 'brl', minimumFractionDigits: 2 })}
							</Text>
						</View>
					</TouchableHighlight>
				</View>
			</ScrollView>

			<ActionButton buttonColor='#3788FE'>
				<ActionButton.Item buttonColor='#00C853' title='Receita' onPress={() => navigation.navigate('NewIncome')}>
					<Icon name='trending-up' size={20} color='white' />
				</ActionButton.Item>

				<ActionButton.Item buttonColor='#D84315' title='Despesa' onPress={() => navigation.navigate('NewExpense')}>
					<Icon name='trending-down' size={20} color='white' />
				</ActionButton.Item>
			</ActionButton>
		</View>
	)
}

Dashboard.navigationOptions = {
	header: null
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	overview: {
		backgroundColor: '#EEE',
		marginHorizontal: 16,
		marginVertical: 8,
		borderRadius: 16,
		paddingVertical: 8
	},
	chartContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	balanceLabel: {
		fontSize: 18,
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 8
	},
	balance: {
		fontSize: 24,
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	balancePositive: {
		color: '#00C853'
	},
	balanceNegative: {
		color: '#D84315'
	},
	flexRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12
	},
	textExpense: {
		fontSize: 18,
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		color: '#D84315'
	},
	textIncome: {
		fontSize: 18,
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		color: '#00C853'
	}
})

export default Dashboard