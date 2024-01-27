import { getApiUrl } from './apiConfig'
import axios from 'axios'


export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    //   return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
}

export const submitLogin = (props) => {
    const { loginData, setWrongCredentials, navigate, setOpen, setLoading } = props
    const loginUrl = getApiUrl('auth/login')
    setLoading(true)
    axios.post(loginUrl, loginData, { withCredentials: true })
        .then(response  => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            setLoading(false)
            navigate('/store', { replace: true })
        }).catch(error => {
            setWrongCredentials({ wrongData: true, infoText: error.response.data.infoMessage })
            setOpen(true)
            setLoading(false)
        })
}
export const submitRegister = (props) => {
    const { registerData, setRegisterData, setWrongData, setOpen, navigate, setLoading } = props
    const registerUrl = getApiUrl('auth/register')
    setLoading(true)
    axios.post(registerUrl, registerData).then(response => {
        setRegisterData({ username: "", email: "", password: "" , role: []})
        setWrongData({ status: false, infoText: response.data.infoMessage })
        setOpen(true)
        setLoading(false)
        navigate('/confirm', { replace: false })
    }).catch(error => {
        setWrongData({ status: true, infoText: error.response.data.infoMessage })
        setOpen(true)
        setLoading(false)
    })
}

export const submitToken = ({ tokenData, setLoading, setWrongData, navigate }) => {
    const tokenUrl = getApiUrl(`auth/confirm?token=${tokenData}`)
    //const tokenUrl = getApiUrl('auth/confirm?token=${itemId}')
    setLoading(true)
    axios.get(tokenUrl).then(response => {
        setLoading(false)
        setWrongData({ status: false, infoText: response.data.infoMessage })
        navigate('/', { replace: true })
    }).catch(error => {
        setWrongData({ status: true, infoText: error.response.data.infoMessage })
        setLoading(false)
    })
}

export const getUserDetails = ({ setUserRole }) => {
    // console.log(authHeader())
    const userDetailsUrl = getApiUrl('auth/details')
    axios.get(userDetailsUrl, { headers: authHeader()}, { withCredentials: true }).then(userDetails => {
        // const role = userDetails.data.roles.map(({ id }) => id)
        setUserRole(userDetails.data.roles.map(({ id }) => id))
        // console.log(role)
        // console.log(userDetails.data.id)
        const cartCountUrl = getApiUrl(`shoppingList/count/${userDetails.data.id}`)
        axios.get(cartCountUrl, { withCredentials: true }).then(response => {
            localStorage.setItem("number", response.data.toString())
            window.dispatchEvent(new Event('storage'))
        })
    })
}


export const logout = ({ navigate }) => {
    const logoutUrl = getApiUrl('auth/logout')
    axios.get(logoutUrl, { withCredentials: true }).then(() => {
        navigate('/', { replace: true })
    })
}