import { getApiUrl } from './apiConfig'
import axios from 'axios'
import { authHeader } from './auth'

export const getAllProducts = ({ setProductList }) => {
    const productUrl = getApiUrl("product/all")
    axios.get(productUrl, { headers: authHeader()}, { withCredentials: true }).then((response) => {
        setProductList(response.data)
    })
}
export const getBestProducts = ({ setBestProductList }) => {
    const productUrl = getApiUrl("product/best")
    axios.get(productUrl, { headers: authHeader()}, { withCredentials: true }).then((response) => {
        setBestProductList(response.data)
    })
}
export const saveProduct = ({ product, edit }) => {
    const productUpdateUrl = getApiUrl("product/update")
    const productCreateUrl = getApiUrl("product/create")
    return edit === true ? axios.put(productUpdateUrl, product, { headers: authHeader()}, { withCredentials: true })
        : axios.post(productCreateUrl, product, { headers: authHeader()}, { withCredentials: true })
}
export const getProductById = async (id) => {
    const productUrl = getApiUrl(`product/${id}`)
    const response = await axios.get(productUrl, { headers: authHeader()}, { withCredentials: true })
    return response.data
}
export const getRelatedProducts = async ({ category, id }) => {
    const productUrl = getApiUrl(`product/related/${category}/${id}`)
    const response = await axios.get(productUrl, { headers: authHeader()}, { withCredentials: true })
    return response.data
}

export const getAllSale = async (id) => {
    const productUrl = getApiUrl(`saleDetail/${id}`)
    const response = await axios.get(productUrl, { headers: authHeader()}, { withCredentials: true })
    return response.data
}


export const deleteProduct = ({ itemId }) => {
    const deleteUrl = getApiUrl(`product/clean/${itemId}`)
    return axios.delete(deleteUrl, { headers: authHeader()}, { withCredentials: true })
}