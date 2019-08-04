import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, TextInput, DatePickerAndroid, Switch, TouchableHighlight } from 'react-native'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { TextInputMask } from 'react-native-masked-text'
import firebase from 'react-native-firebase'
import { generateUUID } from '../utils/uuid'
import { createIncome } from '../store/actions'

const NewIncome = ({ navigation }) => {
	const [description, setDescription] = useState('')
	const [value, setValue] = useState('')
	const [date, setDate] = useState(Date.now())
	const [received, setReceived] = useState(false)

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

	onSave = async () => {
		const income = {
			description,
			value: valueRef.current.getRawValue() || 0,
			date,
			received,
			id: generateUUID(),
			userId: ''
		}

		try {
			await firebase.firestore().collection('incomes').add(income)

			dispatch(createIncome(income))

			navigation.navigate('Dashboard')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Descrição</Text>
			<TextInput value={description} onChangeText={description => setDescription(description)}
				placeholder='Ex.: Roupas' autoCapitalize='sentences' underlineColorAndroid='#999' style={styles.input}
			/>

			<Text style={styles.label}>Valor</Text>
			<TextInputMask
				style={styles.input}
				type='money'
				options={{ maskType: 'BRL', separator: ',', delimiter: '.', unit: 'R$ ' }}
				value={value}
				keyboardType='numeric'
				onChangeText={value => setValue(value)}
				placeholder='Ex.: R$ 1,00'
				ref={valueRef}
			/>

			<Text style={styles.label}>Data</Text>
			<Text style={[styles.input, styles.inputDate]} onPress={onClickDate}>
				{moment(date).format('DD/MM/YYYY')}
			</Text>

			<View style={styles.switchContainer}>
				<Text style={[styles.label, styles.switchLabel]} onPress={() => setReceived(!received)}>Recebido</Text>
				<Switch style={styles.switch} value={received} onValueChange={setReceived} />
			</View>

			<View style={styles.submitContainer}>
				<TouchableHighlight style={styles.button} underlayColor='#009624' onPress={onSave}>
					<Text style={styles.buttonText}>Salvar</Text>
				</TouchableHighlight>
			</View>
		</View>
	)
}

NewIncome.navigationOptions = {
	title: 'Nova Receita'
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingTop: 40
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
		borderBottomWidth: 1
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
		borderColor: '#009624',
		borderRadius: 24,
		backgroundColor: '#00C853',
		height: 48,
		width: '80%'
	},
	buttonText: {
		fontWeight: 'bold',
		fontFamily: 'Roboto',
		fontSize: 18,
		color: '#FFF'
	},
})

export default withNavigation(NewIncome)