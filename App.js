import React from 'react'
import { Provider } from 'react-redux'
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { store } from './src/store'
import { SignIn, Splash, Dashboard, NewExpense, NewIncome, SignUp } from './src/views'

const Home = createStackNavigator({ Dashboard, NewExpense, NewIncome }, { initialRouteName: 'Dashboard' })

const Login = createStackNavigator({ SignIn, SignUp }, { initialRouteName: 'SignIn' })

const AppContainer = createAppContainer(
  createSwitchNavigator(
    { Splash, Login, Home },
    { initialRouteName: 'Splash' }
  )
)

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

export default App
