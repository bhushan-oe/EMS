import axios from 'axios'
import { APPLY_LEAVES_URL } from '../configurations/endPoints'

export function applyLeaveApi(data) {
  return axios.post(APPLY_LEAVES_URL, data)
}
