import customFetch from '../../utils/axios';
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';

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
    const res = await customFetch.patch('/auth/updateUser', user);
    return res.data;
  } catch (err) {
    if (err.response.status === 401) {
      thunkApi.dispatch(logoutUser());
      return thunkApi.rejectWithValue('Unauthorized! Logging out...');
    }
    return thunkApi.rejectWithValue(err.response.data.msg);
  }
};

export const clearStoreThunk = async (message, thunkApi) => {
  try {
    thunkApi.dispatch(logoutUser(message));
    thunkApi.dispatch(clearAllJobsState());
    thunkApi.dispatch(clearValues());
    return Promise.resolve();
  } catch (err) {
    return Promise.reject();
  }
};
