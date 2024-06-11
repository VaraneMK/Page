import { BASE_URL, HTTP_CLIENT_IP } from '../../utils/constants';
import { createAction, createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLogin = createAsyncThunk('user/getLogin', async (isGuest = false, thunkAPI) => {
	let headers = {};
	isGuest
		? (headers = {
				'http-client-ip': HTTP_CLIENT_IP,
		  })
		: (headers = {
				'http-client-ip': HTTP_CLIENT_IP,
				Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
		  });

	try {
		const res = await axios.get(`${BASE_URL}/user/me`, {
			headers: headers,
			withCredentials: true,
		});
		return res.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err);
	}
});

export const setLogin = createAsyncThunk('user/setLogin', async (userData, thunkAPI) => {
	try {
		const res = await axios.post(
			`${BASE_URL}/auth/login`,
			{ grant_type: 'password', username: userData.loginValue, password: userData.passwordValue },
			{
				headers: { 'http-client-ip': HTTP_CLIENT_IP, 'Content-Type': 'application/x-www-form-urlencoded' },
				withCredentials: true,
			},
		);
		return res.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err);
	}
});

export const changePassword = createAsyncThunk('user/changePassword', async (password, thunkAPI) => {
	try {
		const res = await axios.patch(
			`${BASE_URL}/user/password`,
			{
				password: password,
			},
			{
				headers: {
					'http-client-ip': HTTP_CLIENT_IP,
					'Content-Type': 'application/json',
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

export const getHistory = createAsyncThunk('user/getHistory', async (param, thunkAPI) => {
	let headers = {};
	param.isGuest
		? (headers = {
				'http-client-ip': HTTP_CLIENT_IP,
		  })
		: (headers = {
				'http-client-ip': HTTP_CLIENT_IP,
				Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
		  });

	try {
		const res = await axios.get(`${BASE_URL}/file/`, {
			params: {
				limit: param.limit,
				offset: param.offset,
			},
			headers: headers,
			withCredentials: true,
		});
		return res.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err);
	}
});

export const userLogout = createAction('LOGOUT');

const userSlice = createSlice({
	name: 'user',
	initialState: {
		data: {},
		fileHistory: { files: [], count: 0 },
		token: {},
		isLogin: false,
		isAdmin: false,
		isLoading: false,
		isError: false,
		isAuthError: false,
		isFetching: false,
		isChangeError: false,
		isChangeSuccess: false,
	},
	extraReducers: (builder) => {
		builder.addCase(getLogin.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(getLogin.fulfilled, (state, action) => {
			state.data = action.payload;
			state.isLogin = action?.payload.id === -1 ? false : true;
			state.isAdmin = action?.payload.role === 'ADMIN' ? true : false;
			state.isLoading = false;
			state.isError = false;
		});
		builder.addCase(getLogin.rejected, (state) => {
			state.isLoading = false;
			state.isError = true;
		});

		builder.addCase(setLogin.pending, (state) => {
			state.isLoading = true;
			state.isAuthError = false;
		});

		builder.addCase(setLogin.fulfilled, (state, action) => {
			localStorage.setItem('jwt_token', action.payload.access_token);
			state.token = action.payload;
			state.isLogin = true;
			state.isLoading = false;
			state.isAuthError = false;
		});
		builder.addCase(setLogin.rejected, (state) => {
			state.isLoading = false;
			state.isAuthError = true;
		});

		builder.addCase(changePassword.pending, (state) => {
			state.isLoading = true;
			state.isChangeError = false;
		});
		builder.addCase(changePassword.fulfilled, (state, action) => {
			state.data = action?.payload;
			state.isLoading = false;
			state.isChangeError = false;
		});
		builder.addCase(changePassword.rejected, (state) => {
			state.isLoading = false;
			state.isChangeError = true;
		});

		builder.addCase(getHistory.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(getHistory.fulfilled, (state, action) => {
			let oldArray = current(state.fileHistory.files);
			let newArray = action.payload.files;
			let status = false;

			for (let i = 0; i < oldArray.length; i++) {
				if (oldArray[i].id === newArray[i]?.id) {
					status = true;
				}
			}
			if (!status) {
				state.fileHistory = {
					files: [...state.fileHistory.files, ...action.payload.files],
					count: action.payload.count,
				};
			}

			state.isLoading = false;
			state.isError = false;
		});
		builder.addCase(getHistory.rejected, (state) => {
			state.isLoading = false;
			state.isError = true;
		});

		builder.addCase(userLogout, (state) => {
			state.data = {};
			state.fileHistory = { files: [], count: 0 };
			state.token = {};
			state.isLogin = false;
			state.isAdmin = false;
			state.isLoading = false;
			state.isError = false;
			state.isAuthError = false;
			state.isFetching = false;
			state.isChangeError = false;
			state.isChangeSuccess = false;
		});
	},
});

export default userSlice.reducer;
