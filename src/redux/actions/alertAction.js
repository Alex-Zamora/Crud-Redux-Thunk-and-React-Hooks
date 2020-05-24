import {
  SHOW_ALERT,
  HIDE_ALERT
} from '../types'

export const showAlert = alert => dispatch => {
  dispatch({
    type: SHOW_ALERT,
    payload: alert
  })
}

export const hideAlert = () => dispatch => {
  dispatch({
    type: HIDE_ALERT
  })
}