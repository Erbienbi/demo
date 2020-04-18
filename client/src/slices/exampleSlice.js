import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const slice = createSlice({
  name: 'favorites',
  initialState: {
    movieList: []
  },
  reducers: {
    addToFavorites: (state, action) => {
      console.log('Reducer action:', action.payload);
      const { result } = action.payload;

      // state.push(result);
      state.movieList.push(result);
      console.log('State:', JSON.stringify(state));
    },
    sendOrder: (state, action) => {
      console.log('Send order action:', action.payload)
      const payload = {
        imdbID: action.payload.imdbID,
        title: action.payload.Title,
      }
      axios({
        method: 'POST',
        url: 'http://localhost:3000/movie',
        data: payload,
      })
        .then((data) => {
          console.log('Send order successful!')
          console.log(data)
        })
        .catch((err) => {
          console.log('Send order failed!')
          console.log(err.response)
        })
    }
  },
});

// export const { increment, decrement, incrementByAmount } = slice.actions;
export const { addToFavorites, sendOrder } = slice.actions;

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
