import { configureStore } from '@reduxjs/toolkit';
import buildingReducer from '../slices/buildingSlice';
import roomReducer from '../slices/roomSlice';
import userReducer from '../slices/userSlice';

export default configureStore({
  reducer: {
      building: buildingReducer,
      room: roomReducer,
      user: userReducer
  },
});
