import React from 'react'
import {
	View,
	StyleSheet,
	ScrollView
} from 'react-native'
import { useSelector } from 'react-redux'
import ActionButton from 'react-native-action-button'
import Transaction from '../components/Transaction'
import { INCOME } from '../constants'

const Incomes = ({ navigation }) => {
	const incomes = useSelector(store => store.incomesReducer.incomes)

	const editTransaction = item => {
		navigation.navigate('NewIncome', { item })
	}

	const renderItem = (item) => (
		<Transaction
			key={item.id}
			id={item.id}
			date={item.date}
			description={item.description}
			done={item.received}
			type={INCOME}
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
				{renderItems(incomes)}
			</ScrollView>

			<ActionButton buttonColor='#00C853' onPress={() => navigation.navigate('NewIncome')} />
		</View>
	)
}

Incomes.navigationOptions = ({
	title: 'Receitas'
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	}
})

export default Incomes