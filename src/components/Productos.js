import React, { Fragment, useEffect } from 'react'
import Product from './Product'

// REDUX
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../redux/actions/productosAction'

const Productos = () => {
  // get state of store
  const products = useSelector(state => state.productos.productos)
  const error = useSelector(state => state.productos.error)
  const loading = useSelector(state => state.productos.loading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  },[dispatch])

  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de Prodcutos</h2>

      { error 
        ? <p className="font-weight-bold alert alert-danger text-center mt-4">There was an error</p> 
        : null 
      }

      { loading
        ? <p className="text-center">Loading...</p>
        : null
      }

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope='col'>Nombre</th>
            <th scope='col'>Precio</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          { products.length === 0 
            ? 'Products dont exist'
            : products.map(product => (
              <Product
                key={product.id}
                product={product}
              />
            ))
          }
        </tbody>
      </table>
    </Fragment>
  )
}

export default Productos