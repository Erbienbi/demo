import axios from "axios";

// Request to deploy server //
// const instance = axios.create({
//   baseURL: 'https://enigmatic-inlet-64583.herokuapp.com/',
// });

// Request to local server //
const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export default instance;