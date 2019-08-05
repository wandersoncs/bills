import React from 'react'
import { Text } from 'react-native'
import {
	createBottomTabNavigator,
	createMaterialTopTabNavigator
} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Dashboard, Expenses, Incomes } from './'

const icons = {
	Dashboard: 'home',
	List: 'list-ul'
}

const List = createMaterialTopTabNavigator(
	{ Expenses, Incomes },
	{
		tabBarOptions: {
			labelStyle: {
				fontSize: 16,
				color: '#000'
			},
			style: {
				backgroundColor: 'transparent'
			}
		}
	}
)

export default createBottomTabNavigator(
	{ Dashboard, List },
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const icon = icons[navigation.state.routeName]

				return <Icon name={icon} color={tintColor} size={focused ? 24 : 20} />
			}
		}),
		tabBarOptions: {
			activeTintColor: '#000',
			inactiveTintColor: '#AAA',
			showLabel: false
		},
		navigationOptions: () => ({
			header: null
		})
	}
)