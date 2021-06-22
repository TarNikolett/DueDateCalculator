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
  return new Date(2021, date.getMonth(), 0).getDate();
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

function isItTheEndOfTheMonth(dayNumber, lastDayOfMonth) {
  if (dayNumber === lastDayOfMonth) {
    return true;
  }
  return false;
};

function isItTheLastMonthOfTheYear(month) {
  if (month === 11) {
    return true;
  }
  return false;
};

function CalculateDueDate (currentDate, turnaroundTime){
  const reportedDate = new Date(currentDate);
  let year = reportedDate.getFullYear();
  let month = reportedDate.getMonth();
  let dayNumber = reportedDate.getDate();
  let dayNameIndex = reportedDate.getDay();
  let hours = reportedDate.getHours();
  let minutes = reportedDate.getMinutes();
  let resolvedDay = new Date(`${month} ${dayNumber}, ${year} ${hours}:${minutes}`);  

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
    if (i % 8 === 0) {
      if (isItFriday(dayNameIndex) && isItTheEndOfTheWorkingDay(hours)) {
        hours = workDayStartingHour; 
        hours++;
        dayNumber = dayNumber + 3;
        dayNameIndex = 1;
        setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
      }
      else if(isItFriday(dayNameIndex) && !isItTheEndOfTheWorkingDay(hours)){
        hours++;
        setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
      }
      else if (!isItFriday(dayNameIndex) && !isItTheEndOfTheWorkingDay(hours)) {
        hours++;
        setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
      }
      else if (!isItFriday(dayNameIndex) && isItTheEndOfTheWorkingDay(hours)) {
        dayNumber++;
        dayNameIndex++;
        hours = workDayStartingHour;
        hours++;
        setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
      } 
      else if (!isItFriday(dayNameIndex) && isItTheEndOfTheWorkingDay(hours) && !isItTheLastMonthOfTheYear(month) && !isItTheEndOfTheMonth(dayNumber, lastDayOfMonth) ) {
        hours = workDayStartingHour;
        hours++;
        dayNumber++;
        dayNameIndex++;
        setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
      }
      else if (isItFriday(dayNameIndex) && isItTheEndOfTheWorkingDay(hours) && !isItTheEndOfTheMonth(dayNumber, lastDayOfMonth) && !isItTheLastMonthOfTheYear(month)) {
        dayNumber = dayNumber + 3;
        dayNameIndex = 1;
        hours = workDayStartingHour;
        hours++;
        setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
      }
      else if (isItFriday(dayNameIndex) && isItTheEndOfTheWorkingDay(hours) && isItTheEndOfTheMonth(dayNumber, lastDayOfMonth) && !isItTheLastMonthOfTheYear(month)) {
        dayNumber = dayNumber + 3;
        dayNameIndex = 1;
        hours = workDayStartingHour;
        hours++;
        setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
      }
      else if (isItFriday(dayNameIndex) && isItTheEndOfTheWorkingDay(hours) && isItTheEndOfTheMonth(dayNumber, lastDayOfMonth) && isItTheLastMonthOfTheYear(month)) {
        dayNumber = dayNumber + 3;
        dayNameIndex = 1;
        hours = workDayStartingHour;
        hours++;
        year++;
        setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
      }
    }
    else if (isItTheEndOfTheMonth(dayNumber, lastDayOfMonth) && isItTheLastMonthOfTheYear(month) && isItTheEndOfTheWorkingDay(hours)) {
      if (isItFriday(dayNameIndex)){
        dayNumber = dayNumber + 3;
        dayNameIndex = 1;
      }
      else{
        dayNameIndex++;
        dayNumber++;
      }
      hours = workDayStartingHour;
      hours++;
      year++;
      setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
    }
    else if (isItFriday(dayNameIndex) && isItTheEndOfTheWorkingDay(hours)) {
      dayNumber = dayNumber + 3;
      dayNameIndex = 1;
      hours = workDayStartingHour;
      hours++;
      setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
    }
    else if (hours < workDayEndingHour) {
      hours++;
      setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
    }
    else if (isItTheEndOfTheWorkingDay(hours)) {
      hours = workDayStartingHour;
      hours++;
      dayNumber++;
      dayNameIndex++;
      setResolveDate(resolvedDay, month, dayNumber, hours, minutes, year);
    }
 };
  console.log(`Reported day: ${reportedDate}`);
  console.log(`Resolved day: ${resolvedDay}`);
};

CalculateDueDate("Jun 18, 2021 11:00", 10);