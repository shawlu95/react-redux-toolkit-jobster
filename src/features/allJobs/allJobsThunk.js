import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getAllJobsThunk = async (_, thunkApi) => {
  try {
    const { page, search, searchStatus, searchType, sort } =
      thunkApi.getState().allJobs;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }
    const res = await customFetch.get(url);
    return res.data;
  } catch (err) {
    return checkForUnauthorizedResponse(err, thunkApi);
  }
};

export const showStatsThunk = async (_, thunkApi) => {
  try {
    const resp = await customFetch.get('/jobs/stats');
    return resp.data;
  } catch (err) {
    return checkForUnauthorizedResponse(err, thunkApi);
  }
};
