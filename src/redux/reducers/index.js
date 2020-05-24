import { combineReducers } from 'redux'
import productosReducer from '../reducers/productosReducer'
import alertReducer from '../reducers/alertReducer'

export default combineReducers({
  productos: productosReducer,
  alert: alertReducer
})