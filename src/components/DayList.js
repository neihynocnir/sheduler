import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { appointments, days, getSpotsForDay, selectedDay, setDay } = props;
  const dayList = days.map(day => 
    <DayListItem 
      key={day.id}
      name={day.name} 
      spots={getSpotsForDay(appointments, days, day.name)} 
      selected={day.name === selectedDay}
      setDay={setDay}  
    />
  );
  return <ul id={dayList}>{dayList}</ul>
}