export function getInterviewersForDay(state, day) {
  const found = state.days.find(d => day === d.name);

  if (state.days.length === 0 || found === undefined) return [];

  return found.interviewers.map(id => state.interviewers[id]);
}

export function getAppointmentsForDay(state, day) {
  let output = [];

  const filteredDay = state.days.filter(data => data.name === day)

  if (Object.keys(filteredDay).length) {
    output = filteredDay[0].appointments.map(el => state.appointments[el]);
  }

  return output;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
}