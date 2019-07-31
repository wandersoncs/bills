import React from 'react'
import { Provider } from 'react-redux'
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { store } from './src/store'
import { Login, Splash, Home } from './src/views'

const HomeContainer = createStackNavigator({ Home })

const AppContainer = createAppContainer(
  createSwitchNavigator(
    { Splash, Login, HomeContainer },
    { initialRouteName: 'HomeContainer' }
  )
)

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

export default App
