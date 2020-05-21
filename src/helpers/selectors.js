// getAppointmentsForDay
export const getAppointmentsForDay = (state, day) => {
  const appointment = [];
  const appointmentIds = state.days
    .filter(item => item.name === day) 
    .map(item => item.appointments) 
    .reduce((total, value) => total.concat(value), []); 
  if (appointmentIds.length === 0) {
    return appointment;
  } else {
    appointmentIds.forEach(item => {appointment.push(state.appointments[item])})
    return appointment;
  }
}

// getInterview
export const getInterview = (state, interview) => {
  if (!interview) {
      return null;
    } else {
      const student = interview.student;
      const interviewer = state.interviewers[interview.interviewer];
      const interviewObj = { student, interviewer };
      return interviewObj;
    }
  }

  // getInterviewersForDay
  export const getInterviewersForDay = (state, day) => {
    const interviewers = []; 
    const interviewerIds = state.days 
      .filter(item => item.name === day) 
      .map(item => item.interviewers) 
      .reduce((total, value) => total.concat(value), []); 
  
    interviewerIds.forEach(id => {
      interviewers.push(state.interviewers[id]) 
    });
    return interviewers;  
  }

  // getSpotsForDay
  export const getSpotsForDay = (appointments, days, day) => {
    const selecDay = days.find(list => list.name === day);
    const appointmentList = [...selecDay.appointments];
    const availableSpots = appointmentList.length;
  
    const appointmentsSpread = { ...appointments };
  
    const filledSpots = Object.values(appointmentsSpread).reduce(
      (total, appointment) => {
        if (appointmentList.includes(appointment.id)) {
          if (appointment.interview) {
            return total + 1;
          }
        }
        return total;
      },
      0
    );
  
    return availableSpots - filledSpots;
  };