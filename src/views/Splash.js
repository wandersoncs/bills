import React, { useEffect } from 'react'
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'

const Splash = ({ navigation }) => {
	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			// navigation.navigate(user ? 'Home' : 'Login')
			navigation.navigate('Home')
		})
	}, [])

	return (
		<View style={styles.container}>
			<ActivityIndicator size='large' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Splash