import { LOAD_DATA, LOAD_DATA_FAILED, LOAD_DATA_SUCCESS, LOAD_DATA_NO_RESULTS } from './constants';

export const loadData = nummeraanduidingId => ({
  type: LOAD_DATA,
  payload: { nummeraanduidingId },
});

export const loadDataSuccess = payload => ({
  type: LOAD_DATA_SUCCESS,
  payload,
});

export const loadDataFailed = payload => ({
  type: LOAD_DATA_FAILED,
  payload,
});

export const loadDataNoResults = payload => ({
  type: LOAD_DATA_NO_RESULTS,
  payload,
});
