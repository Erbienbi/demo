import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

export const slice = createSlice({
  name: 'user',
  initialState: {
    // number: 3,
    authenticated: false, // checks whether user has logged in or not
    isOwner: false, // checks whether user is an owner
    token: null,
    id: null,
    name: null,
    email: null,
    error: null,
  },
  reducers: {
    // increment: state => {
    //   console.log('Number:', state.number)
    //   state.number += 1
    // },
    // decrement: state => {
    //   console.log('Number:', state.number)
    //   state.number -= 1
    // },
    login: (state, action) => {
      // console.log('Payload', action.payload)
      state.token = action.payload.token
      state.id = action.payload.user.id
      state.name = action.payload.user.name
      state.email = action.payload.user.email
      localStorage.setItem('token', state.token || localStorage.getItem('token'))
      state.authenticated = true
      // console.log('User state after log in:', JSON.stringify(state))
    },
    logout: state => {
      state.token = null
      state.id = null
      state.name = null
      state.email = null
      localStorage.removeItem('token')
      localStorage.removeItem('owner_token')
      state.isOwner = false
      state.authenticated = false
      // console.log('User state after log out:', state)
    },
    ownerLogin: (state, action) => {
      console.log('Masuk', action)
      state.token = action.payload.token
      state.id = action.payload.user.id
      state.name = action.payload.user.name
      state.email = action.payload.user.email
      localStorage.setItem('owner_token', state.token || localStorage.getItem('owner_token'))
      state.authenticated = true
      state.isOwner = true
      console.log('User state after log in:', state.isOwner)
    },
    userError: (state, action) => {
      // console.log('Changing user error message:', action.payload)
      state.error = action.payload.message
    },
    clearError: state => {
      state.error = null
    }
  },
});

// export const { increment, decrement, incrementByAmount } = slice.actions;
export const { login, logout, ownerLogin, userError, clearError } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = state => state.counter.value;

export default slice.reducer;
