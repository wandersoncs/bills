import React, { useEffect, useState, useRef } from 'react'
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	DatePickerAndroid,
	Switch,
	TouchableHighlight
} from 'react-native'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { TextInputMask } from 'react-native-masked-text'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
	createExpense,
	updateExpense,
	deleteExpense
} from '../store/actions/expensesActions'

const NewExpense = ({ navigation }) => {
	const [description, setDescription] = useState('')
	const [value, setValue] = useState()
	const [date, setDate] = useState(Date.now())
	const [paid, setPaid] = useState(false)
	const [id, setId] = useState()
	const valueRef = useRef()

	const dispatch = useDispatch()

	onClickDate = async () => {
		const date = await DatePickerAndroid.open({
			date: Date.now()
		})

		if (date.action === 'dateSetAction') {
			setDate(new Date(date.year, date.month, date.day).getTime())
		}
	}

	onDelete = async (id) => {
		await dispatch(deleteExpense(id))

		navigation.goBack()
	}

	onSave = async () => {
		const expense = {
			description,
			value: isNaN(value) ? (valueRef.current.getRawValue() || 0) : value,
			date,
			paid
		}

		if (id) {
			await dispatch(updateExpense(id, expense))
		} else {
			await dispatch(createExpense(expense))
		}

		navigation.goBack()
	}

	useEffect(() => {
		const item = navigation.getParam('item', null)

		if (item) {
			setId(item.id)
			setDescription(item.description)
			setValue(item.value)
			setPaid(item.done)
			setDate(item.date)
		}

		navigation.setParams({ onDelete })
	}, [])

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Descrição</Text>
			<TextInput value={description} onChangeText={description => setDescription(description)}
				placeholder='Ex.: Roupas' autoCapitalize='sentences' underlineColorAndroid='#999' style={styles.input}
			/>

			<Text style={styles.label}>Valor</Text>
			<TextInputMask
				style={[styles.input, styles.inputValue]}
				type='money'
				options={{ maskType: 'BRL', separator: ',', delimiter: '.', unit: 'R$ ' }}
				value={value}
				keyboardType='numeric'
				onChangeText={value => setValue(value)}
				placeholder='Ex.: R$ 1,00'
				ref={valueRef}
				underlineColorAndroid='#999'
			/>

			<Text style={styles.label}>Data</Text>
			<Text style={[styles.input, styles.inputDate]} onPress={onClickDate}>
				{moment(date).format('DD/MM/YYYY')}
			</Text>

			<View style={styles.switchContainer}>
				<Text style={[styles.label, styles.switchLabel]} onPress={() => setPaid(!paid)}>Pago</Text>
				<Switch style={styles.switch} value={paid} onValueChange={setPaid} />
			</View>

			<View style={styles.submitContainer}>
				<TouchableHighlight style={styles.button} underlayColor='#9f0000' onPress={onSave}>
					<Text style={styles.buttonText}>Salvar</Text>
				</TouchableHighlight>
			</View>
		</View>
	)
}

NewExpense.navigationOptions = ({ navigation }) => {
	const item = navigation.getParam('item', null)
	const deleteItem = navigation.getParam('onDelete')

	const headerRight = item
		? <Icon style={styles.headerButton} name='trash-alt' color='#666' size={20} onPress={() => deleteItem(item.id)} />
		: undefined

	return {
		title: item ? 'Editar' : 'Nova Despesa',
		headerTitleStyle: {
			fontFamily: 'Roboto'
		},
		headerRight
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20
	},
	label: {
		fontSize: 18,
		fontWeight: 'bold',
		marginVertical: 10,
		fontFamily: 'Roboto'
	},
	input: {
		fontSize: 18,
		marginVertical: 10
	},
	inputDate: {
		borderBottomColor: '#999',
		borderBottomWidth: 1.1
	},
	inputValue: {
		marginTop: 0
	},
	switchContainer: {
		flexDirection: 'row',
		width: '100%',
		height: 50,
		marginVertical: 10
	},
	switchLabel: {
		justifyContent: 'flex-start'
	},
	switch: {
		justifyContent: 'flex-end',
		flexGrow: 1
	},
	submitContainer: {
		flex: 1,
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#9f0000',
		borderRadius: 24,
		backgroundColor: '#d84315',
		height: 48,
		width: '80%'
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontFamily: 'Roboto',
		fontSize: 18
	},
	headerButton: {
		paddingHorizontal: 16,
		height: '100%',
		textAlignVertical: 'center'
	}
})

export default NewExpense