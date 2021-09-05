import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "1pm",
//   },
//   {
//     id: 2,
//     time: "2pm",
//     interview: {
//       student: "Jeff Kaplan",
//       interviewer: {
//         id: 1,
//         name: "Selena Sizer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "3pm"
//   },
//   {
//     id: 4,
//     time: "4pm",
//     interview: {
//       student: "Corinna Soroy",
//       interviewer: {
//         id: 3,
//         name: "Muhummad Malzahar",
//         avatar: "https://i.imgur.com/T2WwVfS.png"
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "5pm",
//     interview: {
//       student: "Mitch Jones",
//       interviewer: {
//         id: 4,
//         name: "Corinna Soroy",
//         avatar: "https://i.imgur.com/FK8V841.jpg"
//       }
//     }
//   },
//   {
//     id: "last",
//     time: "6pm",
//     interview: {
//       student: "Carlie Cop",
//       interviewer: {
//         id: 4,
//         name: "Corinna Soroy",
//         avatar: "https://i.imgur.com/FK8V841.jpg"
//       }
//     }
//   }
// ];

// const appointmentItem = appointments
//   .map(appointment => {
//     return <Appointment key={appointment.id} {...appointment} />
//   });



export default function Application(props) {
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState('Monday');

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  let dailyAppointments = [];

  useEffect(() => {
    const GET_DAYS = '/api/days';
    const GET_APPOINTMENTS = '/api/appointments';
    const GET_INTERVIEWERS = '/api/interviewers'

    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS)
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, [])

  dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentItem = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentItem}
      </section>
    </main>
  );
}
