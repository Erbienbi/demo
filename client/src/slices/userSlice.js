import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

export const slice = createSlice({
  name: 'user',
  initialState: {
    number: 3,
    authenticated : false,
    id: null,
    name: "Foo",
    token: null,
    email: null,
  },
  reducers: {
    increment: state => {
      console.log('Number:', state.number)
      state.number += 1
    },
    decrement: state => {
      console.log('Number:', state.number)
      state.number -= 1
    },
    login: (state, action) => {
      state.token = action.payload.user.token
      state.id = action.payload.user.id
      state.name = action.payload.user.name
      state.email = action.payload.user.email
      state.authenticated = true
      console.log('User state after log in:', JSON.stringify(state))
    },
    logout: state => {
      state.token = null
      state.id = null
      state.name = null
      state.email = null
      state.authenticated = false
      console.log('User state after log out:', state)
    }
  },
});

// export const { increment, decrement, incrementByAmount } = slice.actions;
export const { increment, decrement, login, logout } = slice.actions;

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
