import axios from 'axios';

export default axios.create({
  baseURL:'http://localhost:20000',
  withCredentials: true 
})
