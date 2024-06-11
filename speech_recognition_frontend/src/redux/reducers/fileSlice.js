import { BASE_URL, HTTP_CLIENT_IP } from '../../utils/constants';

import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadFile = createAsyncThunk('user/uploadFile', async (fileName, thunkAPI) => {
	try {
		const res = await axios.post(
			`${BASE_URL}/file/`,
			{
				file: fileName,
			},
			{
				headers: {
					'http-client-ip': HTTP_CLIENT_IP,
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
				},
				withCredentials: true,
			},
		);
		return res.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err);
	}
});

export const getFile = createAsyncThunk('file/getFile', async (id, thunkAPI) => {
	try {
		const res = await axios.get(`${BASE_URL}/file/${id}`, {
			headers: {
				'http-client-ip': HTTP_CLIENT_IP,
				Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
			},
			withCredentials: true,
		});
		return res.data;
	} catch (err) {
		console.log(err);
		return thunkAPI.rejectWithValue(err);
	}
});

export const getFileTranslate = createAsyncThunk('file/getFileTranslate', async (id, thunkAPI) => {
	try {
		const res = await axios.get(
			`${BASE_URL}/file/${id}/translate`,
			{
				headers: {
					'http-client-ip': HTTP_CLIENT_IP,
					Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
				},
			},
			{ withCredentials: true },
		);
		return res.data;
	} catch (err) {
		console.log(err);
		return thunkAPI.rejectWithValue(err);
	}
});

export const clearProccess = createAction('clear__proccess');

const fileSlice = createSlice({
	name: 'user',
	initialState: {
		data: [],
		processData: { status: '' },
		isLoading: false,
		isError: false,
	},
	extraReducers: (builder) => {
		builder.addCase(getFile.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(getFile.fulfilled, (state, action) => {
			if (action.payload.status === 'NEW') {
				state.processData = action.payload;
			} else {
				state.data = action.payload;
			}
			state.isLoading = false;
			state.isError = false;
		});
		builder.addCase(getFile.rejected, (state) => {
			state.isLoading = false;
			state.isError = true;
		});

		builder.addCase(getFileTranslate.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(getFileTranslate.fulfilled, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			state.isError = false;
		});
		builder.addCase(getFileTranslate.rejected, (state) => {
			state.isLoading = false;
			state.isError = true;
		});

		builder.addCase(uploadFile.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(uploadFile.fulfilled, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			state.isError = false;
		});
		builder.addCase(uploadFile.rejected, (state) => {
			state.isLoading = false;
			state.isError = true;
		});

		builder.addCase(clearProccess, (state) => {
			state.data = {};
			state.processData = { status: '' };
			state.isLoading = false;
			state = false;
		});
	},
});

export default fileSlice.reducer;
