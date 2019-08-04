// Deprecated

import React from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import { Dashboard, Expenses, Incomes } from './'

export default createBottomTabNavigator({ Expenses, Incomes, Dashboard }, {
	defaultNavigationOptions: ({ navigation }) => ({
		tabBarIcon: ({ focused, tintColor }) => <Text>{navigation.state.routeName}</Text>
	}),
	tabBarOptions: {
		activeTintColor: '#000',
		inactiveTintColor: '#AAA',
		showLabel: false
	},
	navigationOptions: () => ({
		header: null
	})
})