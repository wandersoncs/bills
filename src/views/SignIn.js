import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableHighlight
} from 'react-native'
import firebase from 'react-native-firebase'

const SignIn = ({ navigation }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()

	const login = async (email, password) => {
		try {
			const credencial = await firebase.auth().signInWithEmailAndPassword(email, password)

			navigation.navigate('Main')
		} catch (error) {
			switch (error.code) {
				case 'auth/invalid-email':
					setError('E-mail inválido!')
					break
				case 'auth/wrong-password':
					setError('Usuário/Senha incorreto!')
					break
				case 'auth/user-not-found':
					setError('Usuário não encontrado!')
					break
				case 'auth/user-disabled':
					setError('Usuário desabilitado!')
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
				<TextInput value={email} textContentType='emailAddress' style={styles.input} onChange={clearError}
					placeholder='E-mail' autoCapitalize='none' keyboardType='email-address' onChangeText={email => setEmail(email)}
				/>

				<TextInput value={password} secureTextEntry={true} style={styles.input} onChange={clearError}
					placeholder='Senha' autoCapitalize='none' onChangeText={password => setPassword(password)}
				/>
			</View>

			{error &&
				<Text style={styles.error}>{error}</Text>
			}

			<TouchableHighlight style={styles.button} underlayColor='#1862FF' onPress={event => login(email, password)}>
				<Text style={styles.buttonText}>Entrar</Text>
			</TouchableHighlight>

			{/* <TouchableHighlight style={[styles.button, styles.buttonGoogle]} underlayColor='#BBB' onPress={loginGoogle}>
				<View style={styles.flexRow}>
					<Icon style={styles.icon} name='google' color='#666' brand size={28} />
					<Text style={[styles.buttonText, styles.buttonGoogleText]}>Entrar com Google</Text>
				</View>
			</TouchableHighlight> */}

			<TouchableHighlight style={styles.buttonInline} underlayColor='transparent' onPress={() => navigation.navigate('SignUp')}>
				<Text style={[styles.buttonText, styles.buttonInlineText]}>Criar conta</Text>
			</TouchableHighlight>
		</View>
	)
}

SignIn.navigationOptions = {
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
	buttonGoogle: {
		marginTop: 16,
		backgroundColor: '#DDD'
	},
	buttonGoogleText: {
		color: '#555',
		fontSize: 18
	},
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	icon: {
		marginRight: 8
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

export default SignIn
