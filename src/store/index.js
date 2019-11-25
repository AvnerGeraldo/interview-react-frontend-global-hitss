import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

//Reducer
import reducer from '../reducers'

//Sagas
import rootSaga from '../sagas'

//Create SagaMiddleware
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga)

export default store