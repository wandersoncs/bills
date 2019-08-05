import React from 'react'
import {
	createBottomTabNavigator,
	createMaterialTopTabNavigator
} from 'react-navigation'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import firebase from 'react-native-firebase'
import {
	Dashboard,
	Expenses,
	Incomes
} from './'

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
		navigationOptions: ({ navigation }) => {
			const logout = async () => {
				await firebase.auth().signOut()

				navigation.navigate('Splash')
			}
			return {
				title: 'Bills',
				headerTitleStyle: {
					fontFamily: 'Roboto'
				},
				headerRight: (
					<Icon style={styles.headerButton} name='sign-out-alt' color='#666' size={20} onPress={logout} />
				)
			}
		}
	}
)

const styles = StyleSheet.create({
	headerButton: {
		paddingHorizontal: 16,
		height: '100%',
		textAlignVertical: 'center'
	}
})