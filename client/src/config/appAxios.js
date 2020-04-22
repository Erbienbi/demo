import axios from "axios";

// Request to deploy server //
// const instance = axios.create({
//   baseURL: 'insertURLhere',
// });

// Request to local server //
const instance = axios.create({
  baseURL: "https://enigmatic-inlet-64583.herokuapp.com/",
});

export default instance;