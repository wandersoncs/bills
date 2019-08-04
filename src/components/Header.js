import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

const Header = ({ title, hasBack, navigation }) => {
	const back = () => {
		if (hasBack) {
			navigation.goBack()
		}
	}

	return (
		<View style={styles.container}>
			<Text>{title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row'
	}
})

export default withNavigation(Header)