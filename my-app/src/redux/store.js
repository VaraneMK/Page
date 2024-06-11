import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import userSlice from './reducers/userSlice';
import fileSlice from './reducers/fileSlice';
import adminSlice from './reducers/adminSlice';
export const store = configureStore({
	reducer: { userSlice: userSlice, fileSlice: fileSlice, adminSlice: adminSlice },
	devTools: true,
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});
