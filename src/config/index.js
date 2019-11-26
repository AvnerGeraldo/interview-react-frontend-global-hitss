import React from 'react'
import { Provider } from 'react-redux'

//Store
import store from '../store'

//Components
import App from '../components'

export default _=> (
	<Provider store={store}>
		<App />
	</Provider>
)