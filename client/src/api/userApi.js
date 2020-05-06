import axios from 'axios'
import {
  ADD_NEW_USER_URL,
  USER_URL,
  CHANGE_PASSWORD_URL
} from '../configurations/endPoints'

export function addNewUserApi(data) {
  const reqBody = data.userInfo
  return axios.post(ADD_NEW_USER_URL, reqBody)
}

export function updateUserApi(payload) {
  const { userInfo, id } = payload
  return axios.put(`${USER_URL}${id}`, userInfo)
}

export function changePasswordApi(payload) {
  const { newPassword, id } = payload
  console.log(newPassword)
  return axios.put(`${CHANGE_PASSWORD_URL}${id}`, { password: newPassword })
}
