import axios from 'axios'
const baseurl = '/api/login'

const login = async credenditals => {
    const response = await axios.post(baseurl, credenditals)
    return response.data
}

export default {login}