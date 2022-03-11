import React, { useState } from 'react'
import './Style.css';

// let currentView;
let viewwww;
let currentYear;
let currentMonth;
let tableRow = [];

export const Calendar = () => {
  const [currentView, setCurrentView] = useState('Select a View')
  
  const changeView = (newView) => {
    setCurrentView(newView);
    viewwww = newView;
    // console.log(viewwww);
  }

  const [currentMonth, setCurrentMonth] = useState('Select a View')
  
  const changeMonth = (newMonth) => {
    setCurrentMonth(newMonth);
  }
  
  const [currentYear, setCurrentYear] = useState('Select Year')
  
  const changeYear = (newYear) => {
    setCurrentYear(newYear);
  }

    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true);

  return (
      <div>
      <div>
          <form>
                <select 
                onChange={(event) => changeView(event.target.value)}
                value={currentView}
                >
                    <option value="">Select a View</option>
                    <option value="month">Month</option>
                    <option value="week">Week</option>
                    <option value="schedule">Schedule</option>
                </select>

                
                {currentView === "month" &&
                        <select onChange={(event) => changeMonth(event.target.value)}
                        value={currentMonth}>
                            <option value="">Select a Month</option>
                            <option value="0">January</option>
                            <option value="1">February</option>
                            <option value="2">March</option>
                            <option value="3">April</option>
                            <option value="4">May</option>
                            <option value="5">June</option>
                            <option value="6">July</option>
                            <option value="7">August</option>
                            <option value="8">September</option>
                            <option value="9">October</option>
                            <option value="10">November</option>
                            <option value="11">December</option>
                        </select>
                }

                {currentView === "month" &&
                        <select onChange={(event) => changeYear(event.target.value)}
                        value={currentYear}>
                            <option value="">Select Year</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                        </select>
                }
            </form>
            <div>
        <input type="submit" value="Search" onClick={onClick} />
        { showResults ? <MonthStuff /> : null }
      </div>
            
      </div>
    </div>
  )
}

const MonthStuff = () =>{
    // let view = currentView;
    let head = [];
    let monthInput = currentMonth;
    let yearInput = currentYear;
    let week1 = [];
    let week2 = [];
    let week3 = [];
    let week4 = [];
    let week5 = [];
    let week6 = [];
    let monthHasFiveWeeks = false;
    let monthHasSixWeeks = false;

    // From https://stackoverflow.com/questions/13146418/find-all-the-days-in-a-month-with-date-object

    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        month = parseInt(month);
        
        while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
        }
        // console.log(days);
        return days;
    }

    let month;

    function createWeeks() {
        let dayOne = month[0];
        let dayOfWeek = dayOne.getDay();
        let weekCount = 1;
        for (let count = 0; count < month.length; count++) {
            if (weekCount === 1){
                week1.push(month[count]);
            } else if (weekCount === 2) {
                week2.push(month[count]);
            }else if (weekCount === 3) {
                week3.push(month[count]);
            } else if (weekCount === 4) {
                week4.push(month[count]);
            } else if (weekCount === 5) {
                week5.push(month[count]);
                monthHasFiveWeeks = true;
            } else {
                week6.push(month[count]);
                monthHasSixWeeks = true;
            }

            if (dayOfWeek === 6) {
                dayOfWeek=0;
                weekCount+=1;
            } else {
                dayOfWeek+=1;
            }
        }
    }

    function createMonth(){
        createWeeks();
        let weeks = [week1, week2, week3, week4];
        if (monthHasFiveWeeks) {
            weeks.push(week5);
        }	
        if (monthHasSixWeeks) {
            weeks.push(week6);
        }
        
        let sun = (<th>S</th>);
        head.push(sun);
        let mon = (<th>M</th>);
        head.push(mon);
        let tue = (<th>T</th>);
        head.push(tue);
        let wed = (<th>W</th>);
        head.push(wed);
        let thu = (<th>T</th>);
        head.push(thu);
        let fri = (<th>F</th>);
        head.push(fri);
        let sat = (<th>S</th>);
        head.push(sat);

        let r = 0;
        for (let week in weeks) {
            
            // console.log(r);
            // console.log(weeks.length);
            let final = [];
            let x = weeks[week];
            if (week == 0) {
                let firstDay = x[0].getDay();
                for (let i = 0; i<firstDay; i++) {
                    let cell = (<td></td>);
                    final.push(cell);
                }
            }
            for (let day in x){
                day = x[day].getDate();
                console.log(day);
                let cell = (<td>{day}</td>);
                final.push(cell);
            }
            
            tableRow.push(<tr>{final}</tr>);
            console.log(final);
            r+=1;
        }
        

    }

    if (viewwww === "month") {
        month = getDaysInMonth(0, 2022);
        createMonth();
    }

    // function createWeek() {
    //     let today = new Date();
    //     let currentMonth = today.getMonth();
    //     let currentYear = today.getFullYear();
    //     let currentDay = today.getDate();

    //     month = getDaysInMonth(currentMonth, currentYear);
    //     createWeeks();
    //     let tableRow = (<tr></tr>);
    //     let tableHead = (<tr></tr>);
    //     for (let i = (currentDay-1); i < ((currentDay-1)+7); i++) {
    //         console.log(month[i]);
    //         let header = document.createElement("th");
    //         let cell = document.createElement("td");
    //         cell.textContent = month[i].getDate();
    //         if(month[i].getDay() === 0 || month[i].getDay() === 6) {
    //             header.textContent = "S";
    //         } else if (month[i].getDay() === 1) {
    //             header.textContent = "M";
    //         } else if (month[i].getDay() === 2 || month[i].getDay() === 4) {
    //             header.textContent = "T";
    //         } else if (month[i].getDay() === 3) {
    //             header.textContent = "W";
    //         } else {
    //             header.textContent = "F";
    //         }
    //         tableRow.append(cell);
    //         tableHead.append(header);
    //     }
    //     head.append(tableHead);
    //     body.append(tableRow);
    // }
    // } else if (view === "week") {
    //     createWeek();
    // }
    // const [showResults, setShowResults] = React.useState(false);
    // const onClick = () => setShowResults(true)
    console.log(tableRow);
    return(
        <div id="results" className="search-results">
            <table><thead><tr>{head}</tr></thead><tbody>{tableRow}</tbody></table>
        </div>
    )
    
}

  
  export default Calendar;