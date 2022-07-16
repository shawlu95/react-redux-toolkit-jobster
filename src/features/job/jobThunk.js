import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './jobSlice';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';

export const createJobThunk = async (job, thunkApi) => {
  try {
    const resp = await customFetch.post('/jobs', job);
    thunkApi.dispatch(clearValues());
    return resp.data;
  } catch (err) {
    return checkForUnauthorizedResponse(err, thunkApi);
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
    return checkForUnauthorizedResponse(err, thunkApi);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkApi) => {
  try {
    const res = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkApi.dispatch(clearValues());
    return res.data;
  } catch (err) {
    return checkForUnauthorizedResponse(err, thunkApi);
  }
};
