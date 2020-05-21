import {useReducer, useEffect } from 'react';
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";



export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => dispatch({ type: SET_DAY, day });

function reducer(state, action) {
const { appointments, day, days, id, interview, interviewers, type } = action;
  switch (type) {
    case SET_DAY:
      return { ...state, day };
      case SET_APPLICATION_DATA:
        return { ...state, days, appointments, interviewers };
        case SET_INTERVIEW: {
          const appointment = {
            ...state.appointments[id],
            interview: interview && { ...interview }
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment
          };
          return { ...state, appointments };
        }
        default:
          throw new Error(`Tried to reduce with unsupported action type: ${type}`)}
}

function bookInterview(id, interview) {
  return axios
    .put(`/api/appointments/${id}`, { interview })
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview})
    });
}

function deleteInterview(id) {
  return axios
  .delete(`/api/appointments/${id}`)
  .then(() => {
    dispatch({ type: SET_INTERVIEW, id, interview: null})
  });
}

useEffect(() => {
  const getDays = axios.get(`/api/days`);
  const getAppointments = axios.get(`/api/appointments`);
  const getInterviewers = axios.get(`/api/interviewers`);
  Promise.all([getDays, getAppointments,getInterviewers])
      .then(all => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        });
      })
      .catch(err => console.log(err));
    }, []);

  return { state, setDay, bookInterview, deleteInterview, reducer }
}