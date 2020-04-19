import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

export const slice = createSlice({
  name: 'building',
  initialState: {
    allBuildings: [],
    current: 0,
    error: null,
  },
  reducers: {
    createBuilding: (state, action) => {
      console.log('Create building slice:', action.payload)
      state.allBuildings.push(action.payload)
    },
    deleteBuilding: (state, action) => {
      console.log('Delete building slice:')
    },
    buildingError: (state, action) => {
      // console.log('Changing building error message:', action.payload)
      state.error = action.payload.message
    },
    clearError: state => {
      state.error = null
    }
  },
});

export const { createBuilding, deleteBuilding, buildingError, clearError } = slice.actions;

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
