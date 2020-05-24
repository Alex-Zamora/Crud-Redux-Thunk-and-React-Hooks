import React, { useState, useEffect } from 'react'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { crearProductoAction } from '../redux/actions/productosAction'
import { showAlert, hideAlert } from '../redux/actions/alertAction'

const NuevoProducto = ({ history }) => {
  // local state
  const [nombre, guardarNombre] = useState('')
  const [precio, guardarPrecio] = useState('')

  // useDispatch is for execute an action 
  const dispatch = useDispatch()

  // execute action createProduct
  const agregarProducto = product => dispatch(crearProductoAction(product, history))

  // access store state
  const loading = useSelector(state => state.productos.loading)
  const error = useSelector(state => state.productos.error)
  const alert = useSelector(state => state.alert.alert)
  
  useEffect(() => {
    console.log(loading)
  },[loading])

  const submitProduct = e => {
    e.preventDefault()

    //validate product
    if (nombre.trim() === '' || precio <= 0) {
      const alert = {
        message: 'Ambos campos son obligatorios',
        class: 'alert alert-danger text-center text-uppercase p3'
      }
      dispatch(showAlert(alert))
      return
    }

    // if dont exist error
    dispatch(hideAlert())

    // create new product
    agregarProducto({
      nombre,
      precio
    })

    //redirect
    // history.push('/')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            {alert ? <p className={alert.class}>{alert.message}</p> : null }

            <form
              onSubmit={submitProduct}
            >
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className='form-control'
                  placeholder='Nombre producto'
                  name='nombre'
                  value={nombre}
                  onChange={e => guardarNombre(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="text"
                  className='form-control'
                  placeholder='Precio Producto'
                  name='precio'
                  value={precio}
                  onChange={e => guardarPrecio(Number(e.target.value))} />
              </div>
              <button
                type='submit'
                className='btn
                btn-primary
                font-weight-bold
                text-uppercase
                d-block
                w-100'>Agregar</button>
            </form>
            { loading ? <p>Loading....</p> : null }
            { error ? <p className="alert alert-danger p2 mt-4 text-center">There was an error</p> : null }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto