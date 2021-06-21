function setResolveDate (date, month, dayNumber, hours, minutes, year){
  date.setMonth(month);
  date.setDate(dayNumber);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setYear(year);
};

function getLastDayOfMonth(date) {
  return new Date(2021, date.getMonth(), 0).getDate();
};

function checkWeekends(index){
  if(index === 0){
    return true
  }else if(index === 6){
    return true
  }
  else{
    return false
  }
}

function CalculateDueDate (currentDate, turnaroundTime){
  const reportedDate = new Date(currentDate);

  let year = reportedDate.getFullYear();
  let month = reportedDate.getMonth();
  let dayNumber = reportedDate.getDate();
  let dayNameIndex = reportedDate.getDay();
  let hours = reportedDate.getHours();
  let minutes = reportedDate.getMinutes();
  let startHour = 9;
  let endHour = 17;
  let resolvedDay = new Date(`${month} ${dayNumber}, ${year} ${hours}:${minutes}`);

  if (checkWeekends(dayNameIndex)){
    console.log("Today is a non-working day!");
    return
  };

  if(hours < startHour || hours >= endHour){
    console.log(`A problem can only be reported during working hours - between ${startHour}AM to ${endHour}PM`);
    return
  };

  for(let i = 1; i <= turnaroundTime; i++){
    let lastDayOfMonth = getLastDayOfMonth(new Date(year, month + 1, dayNumber));
    if(i % 8 === 0){
      if (dayNameIndex !== 5 && hours === endHour){
        hours = startHour;
        hours++;
        dayNumber++;
        dayNameIndex++;
        setResolveDate(resolvedDay,month,dayNumber, hours, minutes, year);
      }
      else if (dayNameIndex !== 5 && hours !== endHour){
        hours++;
        dayNameIndex++;
        setResolveDate(resolvedDay,month,dayNumber, hours, minutes, year);
      }
      else if(dayNameIndex === 5 && hours === endHour && lastDayOfMonth !== dayNumber && month !== 11){
        dayNumber = dayNumber + 3;
        dayNameIndex = 1;
        hours = startHour;
        hours++;
        setResolveDate(resolvedDay,month,dayNumber, hours, minutes, year);
      }
      else if(dayNameIndex === 5 && hours === endHour && lastDayOfMonth === dayNumber && month === 11){
        dayNumber = dayNumber + 3;
        dayNameIndex = 1;
        hours = startHour;
        hours++;
        year++;
        setResolveDate(resolvedDay,month,dayNumber, hours, minutes, year);
      }
    }
    else if(dayNumber === lastDayOfMonth && month === 11 && hours === endHour){
      month = 0;
      dayNumber = 1;
      year++;
      setResolveDate(resolvedDay,month,dayNumber, hours, minutes, year);
    }
    else if(dayNameIndex === 5 && hours !== endHour){
      hours++;
      setResolveDate(resolvedDay,month,dayNumber, hours, minutes, year);
    }
    else if(i % 8 !== 0 && hours < endHour){
      hours++;
      setResolveDate(resolvedDay,month,dayNumber, hours, minutes, year);
    }
    else if(dayNumber === lastDayOfMonth && hours === endHour){
      month++;
      dayNumber = 1;
      setResolveDate(resolvedDay,month,dayNumber, hours, minutes, year);
    }
    else if(i % 8 !== 0 && hours === endHour){
      hours = startHour;
      hours++;
      dayNumber++;
      setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
    }
 };
  console.log(`Reported day: ${reportedDate}`);
  console.log(`Resolved day: ${resolvedDay}`);
};

CalculateDueDate("Jun 21, 2021 17:35", 8);