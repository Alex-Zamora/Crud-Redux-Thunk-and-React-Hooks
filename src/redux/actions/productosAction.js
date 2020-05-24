import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  LOADING_PRODUCTS,
  SUCCESS_GET_PRODUCTS,
  ERROR_GET_PRODUCTS,
  GET_PRODUCT_DELETE,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_ERROR,
  EDIT_PRODUCT_LOADING,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  GET_ONE_PRODCUT,
  GET_ONE_PRODUCT_SUCCESS,
  GET_ONE_PRODUCT_ERROR
} from '../types'
import clienteAxios from '../../config/axios'
import alert from 'sweetalert2'

export function crearProductoAction(product, history) {
  return async dispatch => {
    dispatch(agregarProducto())
    try {
      //Insert in the API
      await clienteAxios.post('/productos', product)
      //If all is success, update state
      dispatch(agregarProductoExito(product))
      // alert
      await alert.fire(
        'Correcto',
        'El producto se agregó correctamente',
        'success'
      )
      // redirect
      history.push('/')
    } catch(error) {
      console.log('Error crearProductoAction', error)
      dispatch(agregarProductoError())
      // alert
      alert.fire({
        icon: 'error',
        title: 'There was an error',
        text: 'There was an error'
      })
    }
  }
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO
})

const agregarProductoExito = product => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: product
})

const agregarProductoError = () => ({
  type: AGREGAR_PRODUCTO_ERROR
})

// Get all products
export function getAllProducts() {
  return async dispatch => {
    dispatch(loadingProducts())
    try {
      setTimeout(async () => {
        const response = await clienteAxios.get('productos')
        dispatch(getProductsSuccess(response.data))
      }, 1000)
    } catch(error) {
      dispatch(getProductsError())
    }
  }
}

const loadingProducts = () => ({
  type: LOADING_PRODUCTS,
  payload: true
})

const getProductsSuccess = (products) => ({
  type: SUCCESS_GET_PRODUCTS,
  payload: products
})

const getProductsError = () => ({
  type: ERROR_GET_PRODUCTS,
  payload: true
})

// delete product
export function deleteProductAction(id) {
  return async dispatch => {
    dispatch({
      type: GET_PRODUCT_DELETE,
      payload: id
    })
    try {
      await clienteAxios.delete(`/productos/${id}`)
      dispatch({
        type: PRODUCT_DELETE_SUCCESS
      })
      alert.fire(
        'Deleted!',
        'Your product has been deleted.',
        'success'
      )
    } catch(error) {
      console.log('error deleteProductAction', error)
      dispatch({
        type: PRODUCT_DELETE_ERROR,
        payload: true
      })
    }
  }
}

// get one product
export function getOneProduct(id) {
  return async dispatch => {
    dispatch({
      type: GET_ONE_PRODCUT
    })
    try {
      const response = await clienteAxios.get(`/productos/${id}`)
      dispatch({
        type: GET_ONE_PRODUCT_SUCCESS,
        payload: response.data
      })
    } catch(error) {
      console.log('error getOneProduct ', error)
      dispatch({
        type: GET_ONE_PRODUCT_ERROR,
        payload: true
      })
    }
  }
}

// update product
export function editProductUpdate(product) {
  return async dispatch => {
    dispatch({
      type: EDIT_PRODUCT_LOADING,
      payload: true
    })
    try {
      await clienteAxios.put(`/productos/${product.id}`, product)
      dispatch({
        type: EDIT_PRODUCT_SUCCESS,
        payload: product
      })
    } catch(error) {
      console.log('error editProductUpdate', error)
      dispatch({
        type: EDIT_PRODUCT_ERROR,
        payload: true
      })
    }
  }
}