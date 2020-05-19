
const fixtures = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [3, 5],
      interviewers: [1, 4],
      spots: 1
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 5],
      interviewers: [3, 5],
      spots: 1
    },
    {
      id: 3,
      name: "Wednesday",
      appointments: [3, 5],
      interviewers: [2, 4],
      spots: 1
    },
    {
      id: 4,
      name: "Thursday",
      appointments: [3, 4],
      interviewers: [5, 1],
      spots: 1
    },
    {
      id: 5,
      name: "Friday",
      appointments: [3, 5],
      interviewers: [4, 3],
      spots: 1
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { 
      id: 4, 
      time: "3pm", 
      interview: { student: "Chad Takahashi", interviewer: 3 } 
    },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Felix Jaltech", interviewer: 4 }
    }
  },
  interviewers: {
    "1": {  
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "Mildred Nazir", 
      avatar: "https://i.imgur.com/T2WwVfS.png" 

    },
    "4": { 
      id: 4, 
      name: "Cohana Roy", 
      avatar: "https://i.imgur.com/FK8V841.jpg" 
    },
    "5":{
      id: 5, 
      name: "Sven Jones", 
      avatar: "https://i.imgur.com/twYrpay.jpg" 
    }
  }
};


export default {
  defaults: { baseURL: "http://localhost:8001"},
  get: jest.fn(url => {
    if (url === "/api/days") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.days
      });
    }

    if (url === "/api/appointments") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.appointments
      });
    }

    if (url === "/api/interviewers") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.interviewers
      });
    }
  })
}