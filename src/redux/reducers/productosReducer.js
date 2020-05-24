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

const initialState = {
  productos: [],
  loading: false,
  error: false,
  deleteProductId: null,
  getOneProduct: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case EDIT_PRODUCT_LOADING:
    case LOADING_PRODUCTS:
    case AGREGAR_PRODUCTO:
    case GET_ONE_PRODCUT:
      return {...state, loading: true}
    case AGREGAR_PRODUCTO_EXITO:
      return { ...state, loading: false, productos: [...state.productos, action.payload] }
    case ERROR_GET_PRODUCTS:
    case AGREGAR_PRODUCTO_ERROR:
    case PRODUCT_DELETE_ERROR:
    case GET_ONE_PRODUCT_ERROR:
    case EDIT_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload }
    case SUCCESS_GET_PRODUCTS:
      return { ...state, loading: false, error: false, getOneProduct: {}, productos: action.payload }
    case GET_PRODUCT_DELETE:
      return { ...state, deleteProductId: action.payload }
    case PRODUCT_DELETE_SUCCESS:
      return { 
        ...state, 
        productos: state.productos.filter(producto => producto.id !== state.deleteProductId),
        deleteProductId: null
      }
    case EDIT_PRODUCT_SUCCESS:
      return { 
        ...state, 
        getOneProduct: {},
        productos: state.productos.map(producto =>
          producto.id === action.payload.id ? action.payload : producto
        )
      }
    case GET_ONE_PRODUCT_SUCCESS:
      return { ...state, loading: false, getOneProduct: action.payload }
    default:
      return state
  }
}