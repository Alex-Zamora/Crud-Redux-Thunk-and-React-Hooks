import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

//REDUX
import { useDispatch } from 'react-redux'
import { deleteProductAction } from '../redux/actions/productosAction'
 
const Product = ({ product }) => {
  const { nombre, precio, id } = product

  const dispatch = useDispatch()

  // confirm if you want to delete product
  const confirmDeleteProduct = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteProductAction(id))
      }
    })
  }

  // redirect update form
  // const redirectUpdate = product => {
  //   dispatch(getProductUpdate(product))
  //   history.push(`/productos/editar/${product.id}`)
  // }

  return (
    <tr>
      <td>{nombre}</td>
      <td> <span className="font-weight-bold">${precio}</span></td>
      <td className="acciones">
        <Link
          to={`/productos/editar/${id}`}
          className='btn btn-primary mr-2'
          >
          Editar
        </Link>
        <button
          type='button'
          className="btn btn-danger"
          onClick={() => confirmDeleteProduct(id)}>
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default Product