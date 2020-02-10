import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burgar-2c194.firebaseio.com/'
})
 
export default instance;