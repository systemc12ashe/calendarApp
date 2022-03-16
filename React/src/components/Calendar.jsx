import React, { useState } from 'react'
import { API_KEY, CLIENT_ID, SCOPES } from "../config.js";
import { useAuth } from "../contexts/AuthContext"
import './Style.css';

// let currentView;
let viewwww;
let currentYear;
let currentMonth;
let tableRow = [];

// Calendar and event variables
let calendarID = "primary";
let eventID = ""; // TODO: Store eventID of events
let eventTitle = "Test";
let eventDescription = "This is a test event created using the addEvent() function API call.";
let startDateTime = "2022-03-12T17:00:00-07:00"; // (am/pm)(hour)
let endDateTime =  "2022-03-12T18:00:00-07:00"; // (am/pm)(hour)
let timeZone = "America/Los_Angeles";

export const Calendar = () => {
    // Calendar constants
    const [currentView, setCurrentView] = useState('Select a View')
    const changeView = (newView) => {
        setCurrentView(newView);
        viewwww = newView;
    }
    const [currentMonth, setCurrentMonth] = useState('Select a View')
    const changeMonth = (newMonth) => { setCurrentMonth(newMonth); }
    const [currentYear, setCurrentYear] = useState('Select Year')
    const changeYear = (newYear) => { setCurrentYear(newYear); }
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true);
    const { currentUser } = useAuth();

    // Google Calendar API
    let gapi = window.gapi
    let events = []

    function authenticate() {
        return gapi.auth2.getAuthInstance()
            .signIn({scope: SCOPES})
            .then(function() {
                console.log("Sign-in successful");
                loadClient();
                
            },
                function(err) { console.error("Error signing in", err); });
    }

    function loadClient() {
        gapi.client.setApiKey(API_KEY);
        return gapi.client.load('calendar', 'v3')
            .then(function() {
                console.log("GAPI client loaded for API");
            },
                function(err) { console.error("Error loading GAPI client for API", err); });
    }

    function insertEvent() {
        return gapi.client.calendar.events.insert({
            "calendarId": `${calendarID}`,
            "sendNotifications": false,
            "resource": {
                "summary": `${eventTitle}`,
                "description": `${eventDescription}`,
                "start": {
                    "dateTime": `${startDateTime}`,
                    "timeZone": `${timeZone}`
                },
                "end": {
                    "dateTime": `${endDateTime}`,
                    "timeZone": `${timeZone}`
                }
            }
        }).then(function(response) {
            // Handle the results here (response.result has the parsed body).
            eventID = response.result.id;
            fetch('http://localhost:8080/insertEvent', {
                method: 'Post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                 "useremail": currentUser.email,
                })
            }).then(function (res) {
                console.log(res.status);
            });
            console.log("Response", response);
        },
        function(err) { console.error("Execute error", err); });
    }

    function listEvents() {
        return gapi.client.calendar.events.list({
            'calendarId': `${calendarID}`,
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function(response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);

            var eventsArray = response.result.items;
            if (eventsArray.length > 0) {
                for (let i = 0; i < eventsArray.length; i++) {
                    var event = eventsArray[i];
                    var when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }
                    events.push(event.summary + ' (' + when + ')')
                }
            }
            console.log(events)
        },
        function(err) { console.error("Execute error", err); });
    }

    function deleteEvent() {
        return gapi.client.calendar.events.delete({
            "calendarId": `${calendarID}`,
            "eventId": `${eventID}`,
            "sendNotifications": false,
            "sendUpdates" : "none"
        }).then(function(response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
        },
        function(err) { console.error("Execute error", err); });
    }

    function updateEvent() {
        return gapi.client.calendar.events.update({
            "calendarId": `${calendarID}`,
            "eventId": `${eventID}`,
            "sendNotifications": false,
            "sendUpdates": "none",
            "supportsAttachments": false,
            "resource": {
            "end": {
                "dateTime": `${endDateTime}`
            },
            "start": {
                "dateTime": `${startDateTime}`
            },
            "description": `${eventDescription}`,
            "summary": `${eventTitle}`
            }
        }).then(function(response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
        },
        function(err) { console.error("Execute error", err); });
    }

    gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: CLIENT_ID});
    });

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
                <div>
                    <button className='apiButtons' id='authorize' onClick={authenticate}>Authorize</button>
                    <button className='apiButtons' id='listEvents' onClick={listEvents}>List Events</button>
                    <button className='apiButtons' id='insertEvent' onClick={insertEvent}>Insert Event</button>
                    <button className='apiButtons' id='deleteEvent' onClick={deleteEvent}>Delete Event</button>
                    <button className='apiButtons' id='updateEvent' onClick={updateEvent}>Update Event</button>
                </div>
                <div>
                    <pre></pre>
                </div>
            </div>
        </div>
    )
}

const MonthStuff = () => {
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

    function createMonth() {
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
            if (week === 0) {
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
            r += 1;
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

    return (
        <div id="results" className="search-results">
            <table><thead><tr>{head}</tr></thead><tbody>{tableRow}</tbody></table>
        </div>
    )
}

export default Calendar;