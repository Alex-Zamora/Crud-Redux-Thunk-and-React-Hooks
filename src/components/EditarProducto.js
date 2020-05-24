import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { getOneProduct, editProductUpdate } from '../redux/actions/productosAction'

const EditarProducto = props => {
  const productOne = useSelector(state => state.productos.getOneProduct)
  const dispatch = useDispatch()

  const { nombre, precio } = productOne

  const nameRef = useRef('')
  const priceRef = useRef('')
  
  const id = parseInt(props.match.params.id)
  
  useEffect(() => {
    dispatch(getOneProduct(id))
  },[dispatch, id])

  const submitProductEdit = e => {
    e.preventDefault()
    dispatch(editProductUpdate({
      id,
      nombre: nameRef.current.value,
      precio: priceRef.current.value
    }))
    .then(() => {
      props.history.push('/')
    })
  }
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Nuevo Producto
            </h2>
            <form onSubmit={submitProductEdit}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className='form-control'
                  placeholder='Nombre producto'
                  name='nombre' 
                  ref={nameRef}
                  defaultValue={nombre}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className='form-control'
                  placeholder='Precio Producto'
                  name='precio'
                  ref={priceRef}
                  defaultValue={precio}
                />
              </div>
              <button
                type='submit'
                className='btn
                btn-primary
                font-weight-bold
                text-uppercase
                d-block
                w-100'>Editar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarProducto