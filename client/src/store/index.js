import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
// import favoriteReducer from '../slices/exampleSlice';

export default configureStore({
  reducer: {
      user: userReducer
  },
});
