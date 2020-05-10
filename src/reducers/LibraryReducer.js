import { db } from '../config/db';
import {
  JOBS_FETCH_SUCCESS,
  JOB_DETAILS_ACTION_job_group,
  JOB_DETAILS_ACTION_job_title,
  JOB_DETAILS_ACTION_question,
  JOB_DETAILS_ACTION_phone_number,
  JOB_DETAILS_ACTION_contact_me,
  GET_LATITUDE,
  GET_LONGITUDE,
  SEND_LOADING,
  JOB_RECIEVED_ACTION_job_group,
  JOB_RECIEVED_ACTION_job_title,
  RECIEVE_LOADING
} from '../actions/types'

const INITIAL_STATE = {
     jobs: '',
     job_group: 'pharmacy',
     job_title:'pharmacist',
     jobrecieved_group: 'pharmacy',
     jobrecieved_title:'pharmacist',
     question:'',
     phone_number:'',
     contact_me:false,
     latitude:0,
     longitude:0,
     send_loading:false
};
export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
      case JOBS_FETCH_SUCCESS:
        return (
          {...state, jobs: action.payload}
        )
      case JOB_DETAILS_ACTION_job_group:
        return (
          {...state, job_group: action.payload}
        )
        case JOB_DETAILS_ACTION_job_title:
        return (
          {...state, job_title: action.payload}
        )
        case JOB_DETAILS_ACTION_question:
        return (
          {...state, question: action.payload}
        )
        case JOB_DETAILS_ACTION_phone_number:
        return (
          {...state, phone_number: action.payload}
        )
        case JOB_DETAILS_ACTION_contact_me:
        return (
          {...state, contact_me: action.payload}
        )
        case GET_LATITUDE:
        return (
          {...state, latitude: action.payload}
        )
        case GET_LONGITUDE:
        return (
          {...state, longitude: action.payload}
        )
        case SEND_LOADING:
        return (
          {...state, send_loading: action.payload}
        )
        case JOB_RECIEVED_ACTION_job_group:
        return (
          {...state, jobrecieved_group: action.payload}
        )
        case JOB_RECIEVED_ACTION_job_title:
        return (
          {...state, jobrecieved_title: action.payload}
        )
        case RECIEVE_LOADING:
        return (
          {...state, recieve_loading: action.payload}
        )

       default:
        return state;
  }
};