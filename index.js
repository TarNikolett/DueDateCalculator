function setResolveDate (date, month, dayNumber){
  date.setMonth(month);
  date.setDate(dayNumber);
}

function CalculateDueDate (currentDate, turnaroundTime){
  const reportedDate = new Date(currentDate);
  let dayNumber = reportedDate.getDate();
  let month = reportedDate.getMonth();
  let day = reportedDate.getDay();
  let hours = reportedDate.getHours();
  let resolvedDay = new Date(`${month} ${dayNumber}, 2021 ${hours}:00:00`);

  if(day === 0){
    console.log('Today is Sunday - non-working day!');
    return
  }else if(day === 6){
    console.log('Today is Saturday - non-working day!');
    return
  }else if(hours < 9 || hours > 17){
    console.log('A problem can only be reported during working hours - between 9AM to 5PM');
    return
  };

  for(let i = 1; i <= turnaroundTime; i++){
    let lastDayOfMonth = getLastDayOfMonth(new Date(2021, month + 1, dayNumber));
    if(i % 8 === 0){
      if(day === 5){
        dayNumber = dayNumber + 3;
        day = 1;
        setResolveDate(resolvedDay, month, dayNumber);
      }else{
        dayNumber++;
        day++;
        setResolveDate(resolvedDay, month, dayNumber);
      }
    }
    else if(dayNumber === lastDayOfMonth){
      month++;
      dayNumber = 0;
      setResolveDate(resolvedDay, month, dayNumber);
    }
 };
  console.log(`Reported day: ${reportedDate}`);
  console.log(`Resolved day: ${resolvedDay}`);
};

function getLastDayOfMonth(date) {
  return new Date(2021, date.getMonth(), 0).getDate();
};

CalculateDueDate("June 28, 2021 10:00:00", 9);