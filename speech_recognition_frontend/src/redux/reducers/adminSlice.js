import { BASE_URL, HTTP_CLIENT_IP } from '../../utils/constants';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const createUser = createAsyncThunk('admin/createUser', async (params, thunkAPI) => {
	try {
		const res = await axios.post(
			`${BASE_URL}/user/`,
			{
				login: params.loginValue,
				password: params.passwordValue,
				role: params.role,
			},
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

export const updateUser = createAsyncThunk('admin/updateUser', async (params, thunkAPI) => {
	try {
		const res = await axios.patch(
			`${BASE_URL}/user/${params.id}/`,
			{
				...params,
				id: undefined,
			},
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

export const getUser = createAsyncThunk('admin/getUser', async (id, thunkAPI) => {
	try {
		const res = await axios.get(
			`${BASE_URL}/user/${id}/`,
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

export const getUsers = createAsyncThunk('admin/getUsers', async (param, thunkAPI) => {
	try {
		const res = await axios.get(`${BASE_URL}/user/`, {
			params: {
				limit: param.limit,
				offset: param.offset,
			},
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

export const deleteUser = createAsyncThunk('admin/deleteUser', async (id, thunkAPI) => {
	try {
		const res = await axios.delete(
			`${BASE_URL}/user/${id}/`,
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

export const getAuthStatus = createAsyncThunk('admin/getAuthStatus', async (_, thunkAPI) => {
	try {
		const res = await axios.get(`${BASE_URL}/auth/auth_status`, {
			headers: {
				'http-client-ip': HTTP_CLIENT_IP,
				Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
			},
			withCredentials: true,
		});
		return res.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err);
	}
});

export const setAuthStatus = createAsyncThunk('admin/setAuthStatus', async (status, thunkAPI) => {
	try {
		const res = await axios.post(
			`${BASE_URL}/auth/auth_status`,
			{ new_status: status },
			{
				headers: {
					'http-client-ip': HTTP_CLIENT_IP,
					Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
				},
			},
			{
				withCredentials: true,
			},
		);
		return res.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err);
	}
});

export const getHistory = createAsyncThunk('admin/getHistory', async (param, thunkAPI) => {
	try {
		const res = await axios.get(`${BASE_URL}/file/`, {
			params: {
				limit: param.limit,
				offset: param.offset,
				is_history: param.is_history,
			},
			headers: {
				'http-client-ip': HTTP_CLIENT_IP,
				Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
			},
			withCredentials: true,
		});
		return res.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err);
	}
});

export const deleteHistory = createAsyncThunk('admin/deleteHistory', async (_, thunkAPI) => {
	try {
		const res = await axios.delete(
			`${BASE_URL}/file/`,
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

const adminSlice = createSlice({
	name: 'user',
	initialState: {
		data: [],
		users: [],
		user: {},
		fileHistory: [],
		isLoading: false,
		isError: false,
		authStatus: false,
		createError: false,
		deleteError: false,
		updateError: false,
	},
	extraReducers: (builder) => {
		builder.addCase(getUser.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.isLoading = false;
			state.isError = false;
		});
		builder.addCase(getUser.rejected, (state) => {
			state.isLoading = false;
			state.isError = true;
		});

		builder.addCase(updateUser.pending, (state) => {
			state.isLoading = true;
			state.updateError = false;
		});
		builder.addCase(updateUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.isLoading = false;
			state.updateError = false;
		});
		builder.addCase(updateUser.rejected, (state) => {
			state.isLoading = false;
			state.updateError = true;
		});

		builder.addCase(createUser.pending, (state) => {
			state.isLoading = true;
			state.createError = false;
		});
		builder.addCase(createUser.fulfilled, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			state.createError = false;
		});
		builder.addCase(createUser.rejected, (state) => {
			state.isLoading = false;
			state.createError = true;
		});

		builder.addCase(deleteUser.pending, (state) => {
			state.isLoading = true;
			state.deleteError = false;
		});
		builder.addCase(deleteUser.fulfilled, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			state.deleteError = false;
		});
		builder.addCase(deleteUser.rejected, (state) => {
			state.isLoading = false;
			state.deleteError = true;
		});

		builder.addCase(getUsers.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(getUsers.fulfilled, (state, action) => {
			state.users = action.payload;
			state.isLoading = false;
			state.isError = false;
		});
		builder.addCase(getUsers.rejected, (state) => {
			state.isLoading = false;
			state.isError = true;
		});

		builder.addCase(getAuthStatus.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(getAuthStatus.fulfilled, (state, action) => {
			state.authStatus = action.payload;
			state.isLoading = false;
			state.isError = false;
		});
		builder.addCase(getAuthStatus.rejected, (state) => {
			state.isLoading = false;
			state.isError = true;
		});

		builder.addCase(setAuthStatus.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(setAuthStatus.fulfilled, (state, action) => {
			state.authStatus = action.payload;
			state.isLoading = false;
			state.isError = false;
		});
		builder.addCase(setAuthStatus.rejected, (state) => {
			state.isLoading = false;
			state.isError = true;
		});

		builder.addCase(getHistory.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(getHistory.fulfilled, (state, action) => {
			state.fileHistory = action.payload;
			state.isLoading = false;
			state.isError = false;
		});
		builder.addCase(getHistory.rejected, (state) => {
			state.isLoading = false;
			state.isError = true;
		});

		builder.addCase(deleteHistory.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(deleteHistory.fulfilled, (state, action) => {
			state.fileHistory = { files: [], count: 0 };
			state.isLoading = false;
			state.isError = false;
		});
		builder.addCase(deleteHistory.rejected, (state) => {
			state.isLoading = false;
			state.isError = true;
		});
	},
});

export default adminSlice.reducer;
