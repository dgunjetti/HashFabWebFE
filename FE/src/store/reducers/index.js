import { combineReducers } from 'redux'
import products from './products'
import shoppingCart from './shoppingCart'
import errors from './errors'
import currentUser from './currentUser'
import preview from './preview'
import order from './order'
import appState from './appState'
import apiMessage from './apiMessage'
import myOrder from './myOrder'

export default combineReducers({
  products,
  shoppingCart,
  errors,
  currentUser,
  preview,
  order,
  appState,
  apiMessage,
  myOrder
});
