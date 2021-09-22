import { useEffect, useReducer } from "react";

import axios from "axios";

const useApplicationData = () => {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.payload,
        };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.payload.days,
          appointments: action.payload.appointments,
          interviewers: action.payload.interviewers,
        };
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.payload.id],
          interview: action.payload.interview,
        };
        const appointments = {
          ...state.appointments,
          [action.payload.id]: appointment,
        };

        const updateSpots = () => {
          const selectedDay = state.days.find((day) => day.name === state.day);
          const nullAppointments = selectedDay.appointments.filter(
            (appointment) => appointments[appointment].interview === null
          ).length;
          const updatedDays = state.days.map((day) =>
            day.name === state.day ? { ...day, spots: nullAppointments } : day
          );
          return updatedDays;
        };
        return {
          ...state,
          appointments,
          days: updateSpots(),
        };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      // setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      // dispatch({
      //   type: SET_APPLICATION_DATA,
      //   payload: {
      //     days: all[0].data,
      //     appointments: all[1].data,
      //     interviewers: all[2].data,
      //   },
      // });
      dispatch({
        type: SET_APPLICATION_DATA,
        payload: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        },
      });
    });
  }, []);

  const bookInterview = (id, interview) => {
    console.log(id, interview)
    //We've updated the state locally, need to make a PUT request to make data persistent
    return axios
      .put(`/api/appointments/${id}`, { interview: interview })
      .then((res) => {
        // console.log(res);
        // const appointment = {
        //     ...state.appointments[id],
        //     interview: {...interview}
        // }
        // const appointments = {
        //   ...state.appointments,
        //   [id]: appointment
        // }
        // const interviewDay = state.days.findIndex(day => day.appointments.includes(id))
        // console.log(interviewDay, state.days)
        // setState({
        //   ...state,
        //   appointments
        // });
        dispatch({
          type: SET_INTERVIEW,
          payload: {
            id,
            interview,
          },
        });
      });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      dispatch({
        type: SET_INTERVIEW,
        payload: {
          id,
          interview: null,
        },
      });
    });
  };

  return { state, dispatch, bookInterview, cancelInterview };
};

export default useApplicationData;