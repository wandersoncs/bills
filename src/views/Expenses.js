import React, { useEffect } from 'react'
import { Text, View, FlatList, StyleSheet, ScrollView, StatusBar } from 'react-native'
import { useSelector } from 'react-redux'
import ActionButton from 'react-native-action-button'
import Transaction from '../components/Transaction'

const Incomes = ({ navigation }) => {
	const expenses = useSelector(store => store.expensesReducer.expenses)

	const editTransaction = item => {
		navigation.navigate('NewExpense', { item })
	}

	const renderItem = (item) => (
		<Transaction
			key={item.id}
			id={item.id}
			date={item.date}
			description={item.description}
			done={item.paid}
			type={item.type}
			value={item.value}
			onEdit={editTransaction}
		/>
	)

	const renderItems = items => {
		return items.map(item => renderItem(item))
	}

	return (
		<View style={styles.container}>

			<ScrollView style={styles.scrollview}>
				{renderItems(expenses)}
			</ScrollView>

			<ActionButton buttonColor='#D84315' onPress={() => navigation.navigate('NewExpense')} />
		</View>
	)
}

Incomes.navigationOptions = ({
	title: 'Despesas'
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	scrollview: {
	}
})

export default Incomes