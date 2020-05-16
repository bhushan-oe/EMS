import axios from 'axios'
import {
  FETCH_ALL_PROJECTS,
  ADD_NEW_PROJECT_URL,
  ALLOCATE_NEW_PROJECT_URL,
  ALLOCATE_PROJECT_URL,
  PROJECT_URL
} from '../configurations/endPoints'

export function loadAllProjectsApi() {
  return axios.get(FETCH_ALL_PROJECTS)
}

export function deleteProjectApi(id) {
  return axios.delete(`${PROJECT_URL}${id}`)
}

export function addNewProjectApi(data) {
  const reqBody = data.userInfo
  return axios.post(ADD_NEW_PROJECT_URL, reqBody)
}
export function updateProjectApi(payload) {
  const { userInfo, id } = payload
  return axios.put(`${PROJECT_URL}${id}`, userInfo)
}

export function allocateProjectApi(data) {
  const reqBody = data.userInfo
  return axios.post(ALLOCATE_NEW_PROJECT_URL, reqBody)
}

export function projectAllocationDataApi(id) {
  return axios.get(`${ALLOCATE_PROJECT_URL}?project=${id}`)
}

export function empProjectAllocationDataApi(id) {
  return axios.get(`${ALLOCATE_PROJECT_URL}?employee=${id}`)
}

export function deallocateProjectApi(payload) {
  const { enddate, id } = payload
  const reqBody = { enddate }
  return axios.put(`${ALLOCATE_PROJECT_URL}${id}`, reqBody)
}
export function deleteProjectAllocationApi(id) {
  return axios.delete(`${ALLOCATE_PROJECT_URL}${id}`)
}
