import customFetch from '../../utils/axios';

export const getAllJobsThunk = async (_, thunkApi) => {
  let url = '/jobs';
  try {
    const res = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${thunkApi.getState().user.user.token}`,
      },
    });
    return res.data;
  } catch (err) {
    return thunkApi.rejectWithValue('Failed to retrieve jobs');
  }
};
