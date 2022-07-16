import customFetch from '../../utils/axios';

export const getAllJobsThunk = async (_, thunkApi) => {
  try {
    const res = await customFetch.get('/jobs');
    return res.data;
  } catch (err) {
    return thunkApi.rejectWithValue('Failed to retrieve jobs');
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/jobs/stats');
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
