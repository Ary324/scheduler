import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "1pm",
  },
  {
    id: 2,
    time: "2pm",
    interview: {
      student: "Jeff Kaplan",
      interviewer: {
        id: 1,
        name: "Selena Sizer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm"
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Corinna Soroy",
      interviewer: {
        id: 3,
        name: "Muhummad Malzahar",
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  },
  {
    id: 5,
    time: "5pm",
    interview: {
      student: "Mitch Jones",
      interviewer: {
        id: 4,
        name: "Corinna Soroy",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  },
  {
    id: "last",
    time: "6pm",
    interview: {
      student: "Carlie Cop",
      interviewer: {
        id: 4,
        name: "Corinna Soroy",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  }
];

const appointmentItem = appointments
  .map(appointment => {
    return <Appointment key={appointment.id} {...appointment} />
  });



export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState('Monday');

  useEffect(() => {
    const url = '/api/days';
    axios.get(url)
      .then(res => setDays(res.data))
      .catch(err => console.log(err))
  }, [])

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
          <DayList days={days} day={day} setDay={setDay} />
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
