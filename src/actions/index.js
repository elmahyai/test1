// export const selectLibrary = (libraryId) => {
//     return {
//         type: 'select_library',
//         payload: libraryId 
//     };
// };
import { db } from '../config/db';
import {Actions} from 'react-native-router-flux';
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
} from './types'


function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return  hours + " ساعات و " + minutes + " دقائق "
  
  
}

function timedifference(time_in_milliseconds) {
  var currenttime = (new Date).getTime();
  var timedif = msToTime(currenttime - time_in_milliseconds)
  return timedif

}


export const jobsFetch = (snapshotarray, mylatitude, mylongitude) => {
    var arr = []
    phone_numbers = []
    for (const lib of snapshotarray) {
      const { question, phone_number, latitude, longitude,time_in_milliseconds} = lib;
      var dis = distance(mylatitude, mylongitude, latitude, longitude, "K").toFixed(2)
      var timedif= timedifference(time_in_milliseconds)
      if (phone_numbers.indexOf(phone_number) < 0){
        phone_numbers.push(phone_number)
        arr.push({
        question: question,
        phone_number : phone_number,
        distance: dis,
        timedif: timedif
        })
    }
      arr.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

    }
    

    return (dispatch) => {
          dispatch({ type: JOBS_FETCH_SUCCESS, payload: arr });
    };
  };




export const jobreciever_job_group = (jobrecieved_group) => {
  return {
    type: JOB_RECIEVED_ACTION_job_group,
    payload: jobrecieved_group
  };
};

export const jobreciever_job_title = (jobrecieved_title) => {
  return {
    type: JOB_RECIEVED_ACTION_job_title,
    payload: jobrecieved_title
  };
};


      




export const jobDetails_job_group = (job_group) => {
  return {
    type: JOB_DETAILS_ACTION_job_group,
    payload: job_group
  };
};

export const jobDetails_job_title = ( job_title) => {
  return {
    type: JOB_DETAILS_ACTION_job_title,
    payload: job_title
  };
};

export const jobDetails_question = ( question) => {
  return {
    type: JOB_DETAILS_ACTION_question,
    payload: question
  };
};

export const jobDetails_phone_number = (phone_number) => {
  return {
    type: JOB_DETAILS_ACTION_phone_number,
    payload: phone_number
  };
};

export const jobDetails_contact_me = ( contact_me) => {
  return {
    type: JOB_DETAILS_ACTION_contact_me,
    payload: contact_me
  };
};

export const GET_LATITUDE_action = ( latitude) => {
  return {
    type: GET_LATITUDE,
    payload: latitude
  };
};

export const GET_LONGITUDE_action = ( longitude) => {
  return {
    type: GET_LONGITUDE,
    payload: longitude
  };
};

export const SEND_LOADING_action = ( loading) => {
  return {
    type: SEND_LOADING,
    payload: loading
  };
};
export const RECIEVE_LOADING_action = ( loading) => {
  return {
    type: RECIEVE_LOADING,
    payload: loading
  };
};