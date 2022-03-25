import axios from 'axios'
import { MAIN_URL } from './Url'

export function addCategory(data){
    console.log(data)
return axios.post(`${MAIN_URL}category/addcategory`,data)
}
export function getCategory(){
    return axios.get(`${MAIN_URL}category/getcategory`)
}
export function getSubcategory(){
    return axios.get(`${MAIN_URL}category/getsubcategory`)
}
export function getSpecSub(id){
    return axios.post(`${MAIN_URL}category/getspecsub`,id)
}
export function deleteSubCategory(data){
    console.log(data)
return axios.put(`${MAIN_URL}category/delsubcategory`,data)
}

export function deleteCategory(data){
    console.log(data)
return axios.put(`${MAIN_URL}category/delcategory`,data)
}

export function updateSubCategory(data){
    console.log(data)
return axios.put(`${MAIN_URL}category/updatesubcategory`,data)
}

