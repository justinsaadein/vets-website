import set from 'lodash/fp/set';
import moment from 'moment';

import { makeField } from '../../common/model/fields';

import {
  CLOSE_ADVANCED_SEARCH,
  OPEN_ADVANCED_SEARCH,
  SET_ADVSEARCH_END_DATE,
  SET_ADVSEARCH_START_DATE,
  SET_SEARCH_PARAM,
  TOGGLE_ADVANCED_SEARCH
} from '../utils/constants';

const initialState = {
  params: {
    dateRange: {
      start: null,
      end: null
    },
    term: makeField(''),
    from: {
      field: makeField(''),
      exact: false
    },
    subject: {
      field: makeField(''),
      exact: false
    }
  },
  advanced: {
    visible: false
  }
};

export default function modals(state = initialState, action) {
  switch (action.type) {
    case SET_ADVSEARCH_END_DATE:
      if (action.date) {
        return set('params.dateRange.end', moment(action.date).endOf('day'), state);
      }
      return set('params.dateRange.end', null, state);
    case SET_ADVSEARCH_START_DATE:
      return set('params.dateRange.start', action.date, state);
    case SET_SEARCH_PARAM:
      return set(`params.${action.path}`, action.field, state);
    case TOGGLE_ADVANCED_SEARCH:
      return set('advanced.visible', !state.advanced.visible, state);
    case OPEN_ADVANCED_SEARCH:
      return set('advanced.visible', true, state);
    case CLOSE_ADVANCED_SEARCH:
      return set('advanced.visible', false, state);
    default:
      return state;
  }
}
