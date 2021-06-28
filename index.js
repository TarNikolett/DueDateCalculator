const workDayStartingHour = 9;
const workDayEndingHour = 17;

function setResolveDate(date, month, dayNumber, hours, minutes, year) {
  date.setMonth(month);
  date.setDate(dayNumber);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setYear(year);
};

function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
};

function isItWeekend(index) {
  if (index === 0 || index === 6) {
    return true;
  }
  return false;
};

function isItFriday(index) {
  if (index !== 5) {
    return false;
  }
  return true;
};

function isItTheEndOfTheWorkingDay(hour) {
  if (hour === workDayEndingHour) {
    return true;
  }
  return false;
};

function isItTheLastDayOfTheYear(month, lastDayOfMonth, dayNumber){
  if(month === 11 && dayNumber === lastDayOfMonth){
    return true;
  }
  return false;
};

function CalculateDueDate(currentDate, turnaroundTime){
  const reportedDate = new Date(currentDate);
  let year = reportedDate.getFullYear();
  let month = reportedDate.getMonth();
  let dayNumber = reportedDate.getDate();
  let dayNameIndex = reportedDate.getDay();
  let hours = reportedDate.getHours();
  let minutes = reportedDate.getMinutes();
  let resolvedDay = new Date(`${month} ${dayNumber}, ${year} ${hours}:${minutes}`);  
  let resolveTime = turnaroundTime;

  if (isItWeekend(dayNameIndex)) {
    console.log("Today is a non-working day!");
    return;
  };

  if (hours < workDayStartingHour || hours >= workDayEndingHour) {
    console.log(`A problem can only be reported during working hours - between ${workDayStartingHour}AM to ${workDayEndingHour}PM`);
    return;
  };

  for(let i = 1; i <= turnaroundTime; i++){
    let lastDayOfMonth = getLastDayOfMonth(new Date(year, month + 1, dayNumber));
    if(resolveTime > 0){
      if (!isItTheEndOfTheWorkingDay(hours)) {
        hours++;
        resolveTime--;
      }
      else if (isItTheEndOfTheWorkingDay(hours) && !isItFriday(dayNameIndex)) {
        if (isItTheLastDayOfTheYear(month, lastDayOfMonth, dayNumber)) {
          year++;
        }
        dayNumber++;
        hours = workDayStartingHour;
        hours++;
        dayNameIndex++;
        resolveTime--;
      }
      else if (isItTheEndOfTheWorkingDay(hours) && isItFriday(dayNameIndex)) {
        if (isItTheLastDayOfTheYear(month, lastDayOfMonth, dayNumber)) {
          year++;
        }
        dayNumber = dayNumber + 3;
        hours = workDayStartingHour;
        hours++;
        dayNameIndex = 1;
        resolveTime--;
      }
    }
  };
  setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
  console.log(`Reported day: ${reportedDate}`);
  console.log(`Resolved day: ${resolvedDay}`);
};


CalculateDueDate("Jun 28, 2022 14:00", 34);