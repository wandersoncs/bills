import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import moment from 'moment'
import numberLocale from 'number-locale-string'
import { EXPENSE } from '../constants'

const Transaction = ({ value, description, done, date, type, onEdit, id }) => (
	<TouchableHighlight underlayColor='#ddd' onPress={() => onEdit({ id, type, value, description, done, date })}>
		<View style={styles.container}>
			<View>
				<Text style={styles.description}>{description}</Text>
				<Text>{moment(date).format('DD/MM/YYYY')}</Text>
			</View>
			<View style={styles.flexEnd}>
				<Text style={styles.value}>
					{numberLocale.toLocaleString(value, 'pt-BR', { style: 'currency', currency: 'brl', minimumFractionDigits: 2 })}
				</Text>
				{type === EXPENSE
					? <Text style={styles.status}>{done ? 'Pago' : 'Não foi pago'}</Text>
					: <Text style={styles.status}>{done ? 'Recebido' : 'Não foi recebido'}</Text>
				}

			</View>
		</View>
	</TouchableHighlight>
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 8,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	description: {
		fontSize: 16,
		color: '#111'
	},
	value: {
		fontSize: 16,
		color: '#000'
	},
	flexEnd: {
		alignItems: 'flex-end'
	},
	status: {
		fontSize: 12,
		color: '#444'
	}
})

export default Transaction