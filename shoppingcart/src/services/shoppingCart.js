import { getApiUrl } from './apiConfig'
import axios from 'axios'
import { authHeader } from './auth'

export const addToCart = ({ amountToAdd, productToAdd }) => {
    console.log(authHeader())
    const addUrl = getApiUrl('shoppingList')
    const userDetailUrl = getApiUrl('auth/details')
    axios.get(userDetailUrl, { headers: authHeader()}, { withCredentials: true }).then(userDetails => {
        let cartObject = {
            client: userDetails.data,
            product: productToAdd,
            amount: amountToAdd
        }
        axios.post(addUrl, cartObject, { withCredentials: true }).then(() => {
            let number = parseInt(localStorage.getItem("number")) + 1
            localStorage.setItem("number", number.toString())
            window.dispatchEvent(new Event('storage'))
        })
    })
}
export const deleteShoppingItem = ({ itemId }) => {
    const deleteUrl = getApiUrl(`shoppingList/clean/${itemId}`)
    return axios.delete(deleteUrl, { headers: authHeader()}, { withCredentials: true })
}
export const getShoppingList = ({ setProductList }) => {
    const listUrl = getApiUrl("shoppingList")
    axios.get(listUrl, { headers: authHeader()}, { withCredentials: true }).then(response => {
        setProductList(response.data)
    })
}
export const generateSale = () => {
    const saleUrl = getApiUrl(`sale/create`)
    return axios.post(saleUrl, null, { headers: authHeader()}, { withCredentials: true })
}
export const getSaleList = ({ setSalesList }) => {
    const listUrl = getApiUrl("sale/client")
    axios.get(listUrl, { headers: authHeader()}, { withCredentials: true }).then(response => {
        setSalesList(response.data)
    })
}

export const getAllSale = ({ setAllSale }) => {
    const listUrl = getApiUrl("sale/all")
    return axios.get(listUrl, { headers: authHeader()}, { withCredentials: true }).then(response => {
        setAllSale(response.data)
    })
}

