import React, { useEffect } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/actions/user-actions'

const Splash = ({ navigation }) => {
	const dispatch = useDispatch()

	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				const _user = user

				dispatch(setUser({
					email: _user.email,
					uid: _user.uid
				}))
				navigation.navigate('Main')
			} else {
				navigation.navigate('Login')
			}
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