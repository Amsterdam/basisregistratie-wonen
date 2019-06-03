import produce from 'immer';
import { LOAD_DATA_PENDING } from 'containers/App/constants';
import { LOAD_DATA_SUCCESS, LOAD_DATA_FAILED, LOAD_DATA } from './constants';

export const initialState = {
  data: undefined,
  error: false,
  maatschappelijkeActiviteitId: null,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DATA_PENDING:
        draft.data = undefined;
        draft.error = false;
        draft.errorMessage = '';
        break;

      case LOAD_DATA:
        draft.maatschappelijkeActiviteitId = action.payload.maatschappelijkeActiviteitId;
        draft.error = false;
        draft.errorMessage = '';
        break;

      case LOAD_DATA_SUCCESS:
        draft.data = action.payload;
        draft.error = false;
        draft.errorMessage = '';
        break;

      case LOAD_DATA_FAILED:
        draft.data = null;
        draft.error = true;
        draft.errorMessage = action.payload;
        break;
    }
  });
