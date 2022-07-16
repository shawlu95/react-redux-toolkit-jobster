import customFetch from '../../utils/axios';
import { logoutUser } from '../user/userSlice';
import { clearValues } from './jobSlice';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';

export const createJobThunk = async (job, thunkApi) => {
  try {
    const resp = await customFetch.post('/jobs', job);
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

export const deleteJobThunk = async (jobId, thunkApi) => {
  thunkApi.dispatch(showLoading());
  try {
    const res = await customFetch.delete(`/jobs/${jobId}`);
    // loading will stop when getAllJobs resolves
    thunkApi.dispatch(getAllJobs());
    return res.data.msg;
  } catch (err) {
    thunkApi.dispatch(hideLoading());
    return thunkApi.rejectWithValue(err.response.data.msg);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkApi) => {
  try {
    const res = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkApi.dispatch(clearValues());
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
};
