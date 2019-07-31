import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Transaction = ({ value, description, date, received }) => {
	return (
		<View style={styles.container}>
			<View style={styles.icon}></View>

			<View>
				<Text style={styles.description}>{description}</Text>
				<Text style={styles.value}>{value}</Text>
			</View>

			<View style={styles.action}></View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee',
		borderRadius: 5
	},
	description: {
		fontSize: 12,
		color: '#000'
	},
	value: {
		fontSize: 14,
		color: '#777'
	},
	icon: {},
	action: {},
})