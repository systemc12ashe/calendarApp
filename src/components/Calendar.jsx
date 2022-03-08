import React from "react";

function Calendar() {
    return (
        <div>
        <div className="sidebar">
        </div>

        <div className="content">
            <select name="views" id="view">
                <option value="">Select a View</option>
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="schedule">Schedule</option>
            </select>

            <select name="months" id="month">
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

            <select name="years" id="year">
                <option value="">Select Year</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
            </select>

            <button id="send">See Calendar</button>

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
    );
  };
  
  export default Calendar;