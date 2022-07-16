import customFetch from '../../utils/axios';

import { logoutUser } from './userSlice';

export const registerUserThunk = async (user, thunkApi) => {
  try {
    const res = await customFetch.post('/auth/register', user);
    return res.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data.msg);
  }
};

export const loginUserThunk = async (user, thunkApi) => {
  try {
    const res = await customFetch.post('/auth/login', user);
    return res.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data.msg);
  }
};

export const updateUserThunk = async (user, thunkApi) => {
  try {
    const res = await customFetch.patch('/auth/updateUser', user, {
      headers: {
        authorization: `Bearer ${thunkApi.getState().user.user.token}`,
      },
    });
    return res.data;
  } catch (err) {
    if (err.response.status === 401) {
      thunkApi.dispatch(logoutUser());
      return thunkApi.rejectWithValue('Unauthorized! Logging out...');
    }
    return thunkApi.rejectWithValue(err.response.data.msg);
  }
};
