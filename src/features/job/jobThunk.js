import customFetch from '../../utils/axios';
import { logoutUser } from '../user/userSlice';
import { clearValues } from './jobSlice';

export const createJobThunk = async (job, thunkApi) => {
  try {
    const resp = await customFetch.post('/jobs', job, {
      headers: {
        authorization: `Bearer ${thunkApi.getState().user.user.token}`,
      },
    });
    thunkApi.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkApi.dispatch(logoutUser());
      return thunkApi.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
};
