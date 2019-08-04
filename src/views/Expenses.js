import React from 'react'
import { Text, View, FlatList, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { scale } from 'react-native-size-matters'
import Transaction from '../components/Transaction'
import { generateUUID } from '../utils/uuid'

const Dashboard = () => {
	const expenses = useSelector(store => store.expensesReducer.expenses)

	const renderItem = (item) => (
		<Transaction
			key={item.uuid}
			date={item.date}
			description={item.description}
			done={item.paid}
			type='expense'
			value={item.value}
		/>
	)

	const renderItems = () => {
		return expenses.map(item => renderItem({ ...item, uuid: generateUUID() }))
	}

	return (
		<View style={styles.container}>
			<Text>Gastos</Text>

			<ScrollView style={styles.scrollview}>
				{renderItems()}
			</ScrollView>
		</View>
	)
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