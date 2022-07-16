import customFetch from '../../utils/axios';

export const getAllJobsThunk = async (_, thunkApi) => {
  try {
    const res = await customFetch.get('/jobs');
    return res.data;
  } catch (err) {
    return thunkApi.rejectWithValue('Failed to retrieve jobs');
  }
};
