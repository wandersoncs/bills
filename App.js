import React from 'react'
import { Provider } from 'react-redux'
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'
import {
  SignIn,
  Splash,
  NewExpense,
  NewIncome,
  SignUp,
  Home
} from './src/views'
import { store } from './src/store'

const Main = createStackNavigator({ Home, NewExpense, NewIncome }, { initialRouteName: 'Home' })

const Login = createStackNavigator({ SignIn, SignUp }, { initialRouteName: 'SignIn' })

const AppContainer = createAppContainer(
  createSwitchNavigator(
    { Splash, Login, Main },
    { initialRouteName: 'Splash' }
  )
)

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

export default App
