import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://js-20-kulbaev-default-rtdb.firebaseio.com'
} as undefined);

export default axiosApi;