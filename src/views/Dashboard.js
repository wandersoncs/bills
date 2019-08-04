import React, { useEffect } from 'react'
import { Text, View, FlatList, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import firebase from 'react-native-firebase'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Feather'
import Transaction from '../components/Transaction'
import { generateUUID } from '../utils/uuid'

const Dashboard = ({ navigation }) => {
	const expenses = useSelector(store => store.expensesReducer.expenses)
	const incomes = useSelector(store => store.incomesReducer.incomes)

	const renderItem = (item) => (
		<Transaction
			key={item.uuid}
			date={item.date}
			description={item.description}
			done={item.paid}
			type={item.type}
			value={item.value}
		/>
	)

	const renderItems = (items, type) => {
		return items.map(item => renderItem({ ...item, uuid: generateUUID(), type }))
	}

	const addIncome = () => {
		navigation.navigate('NewIncome')
	}

	useEffect(() => {
		console.log(firebase.auth().currentUser)
	}, [])

	return (
		<View style={styles.container}>
			<Text>Dashboard</Text>

			<ScrollView style={styles.scrollview}>
				{renderItems(expenses, 'expense')}

				{renderItems(incomes, 'income')}
			</ScrollView>

			<ActionButton buttonColor='#3788FE'>
				<ActionButton.Item buttonColor='#00C853' onPress={() => navigation.navigate('NewIncome')}>
					<Icon name='trending-up' size={20} color='white' />
				</ActionButton.Item>

				<ActionButton.Item buttonColor='#D84315'  onPress={() => navigation.navigate('NewExpense')}>
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
		justifyContent: 'center'
	},
	scrollview: {
		paddingHorizontal: 20
	}
})

export default Dashboard