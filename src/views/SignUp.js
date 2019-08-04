import React, { useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableHighlight,
} from 'react-native'
import firebase from 'react-native-firebase'

const SignUp = ({ navigation }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()

	const signUp = async (email, password) => {
		try {
			const credential = await firebase.auth().createUserWithEmailAndPassword(email, password)


			navigation.navigate('Home')
		} catch (error) {
			switch (error.code) {
				case 'auth/invalid-email':
					setError('E-mail inválido!')
					break
				case 'auth/email-already-in-use':
					setError('Este e-mail já está em uso!')
					break
				case 'auth/operation-not-allowed':
					setError('Operação não permitida!')
					break
				case 'auth/weak-password':
					setError('Senha fraca!')
					break
				default:
					setError(undefined)
					break
			}
		}
	}

	const clearError = () => {
		if (error) {
			setError(undefined)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.inputsContainer}>
				<TextInput value={email} textContentType='emailAddress' style={styles.input} keyboardType='email-address'
					placeholder='E-mail' autoCapitalize='none' onChangeText={email => setEmail(email)} onChange={clearError}
				/>

				<TextInput value={password} secureTextEntry={true} style={styles.input} placeholder='Senha'
					autoCapitalize='none' onChangeText={password => setPassword(password)} onChange={clearError}
				/>
			</View>

			{error &&
				<Text style={styles.error}>{error}</Text>
			}

			<TouchableHighlight style={styles.button} underlayColor='#1862FF' onPress={event => signUp(email, password)}>
				<Text style={styles.buttonText}>Cadastrar</Text>
			</TouchableHighlight>

			<TouchableHighlight style={styles.buttonInline} underlayColor='transparent' onPress={() => navigation.navigate('SignIn')}>
				<Text style={[styles.buttonText, styles.buttonInlineText]}>Já possui conta?</Text>
			</TouchableHighlight>
		</View>
	)
}

SignUp.navigationOptions = {
	header: null
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24
	},
	inputsContainer: {
		width: '100%',
		paddingHorizontal: 8
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		marginTop: 20,
		marginBottom: 8,
		backgroundColor: '#3788FE',
		height: 60,
		width: '100%'
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontFamily: 'Roboto',
		fontSize: 20
	},
	input: {
		alignItems: 'flex-end',
		borderBottomWidth: 1,
		borderColor: '#AAA',
		backgroundColor: 'transparent',
		marginVertical: 8,
		fontSize: 20,
		height: 50,
		width: '100%'
	},
	buttonInline: {
		marginTop: 30
	},
	buttonInlineText: {
		color: '#3788DE'
	},
	error: {
		color: '#D84315',
		fontSize: 16
	}
})

export default SignUp
