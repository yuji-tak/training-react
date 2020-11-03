import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-ce65e.firebaseio.com/'
});

export default instance;
