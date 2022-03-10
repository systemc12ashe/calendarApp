import React, { useState } from 'react'
import './Style.css';

export const Calendar = () => {
  const [currentView, setCurrentView] = useState('Select a View')
  
  const changeView = (newView) => {
    setCurrentView(newView)
  }

  const [currentMonth, setCurrentMonth] = useState('Select a View')
  
  const changeMonth = (newMonth) => {
    setCurrentMonth(newMonth)
  }
  

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
                        <select name="years" id="year">
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
      </div>
    
    <div>
        <table>
            <thead id="header">
                <tr>
                    <th>S</th>
                    <th>M</th>
                    <th>T</th>
                    <th>W</th>
                    <th>T</th>
                    <th>F</th>
                    <th>S</th>
                </tr>
            </thead>
            <tbody id="days"></tbody>
        </table>
    </div>
    </div>
  )
}

// const MonthStuff = () =>{
//     const [currentYear, setCurrentYear] = useState('Select a Year')
  
//     const changeYear = (newYear) => {
//       setCurrentYear(newYear)
//     }

//     <select onChange={(event) => changeYear(event.target.value)}
//     value={currentYear}>
//         <option value="">Select Year</option>
//         <option value="2022">2022</option>
//         <option value="2023">2023</option>
//         <option value="2024">2024</option>
//     </select>
// }
  
  export default Calendar;