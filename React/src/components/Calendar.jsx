import React, { useState } from 'react'
import {Nav} from "react-bootstrap"
import {Link, useNavigate} from "react-router-dom";
import { API_KEY, CLIENT_ID, SCOPES } from "../config.js";
import { useAuth } from "../contexts/AuthContext"
import './Style.css';


// let currentView;
let viewwww;
let monthhh;
let yearrr;
let currentYear;
let currentMonth;
let tableRow = [];

// Calendar and event variables
let calendarID = "primary";
let eventID = "";
let eventTitle;
let eventDescription = "";
let eventDate;
let eventStartTime;
let eventEndTime;
let startDateTime;
let endDateTime;
let timeZone = "America/New_York";
let events = [];

export const Calendar = () => {
    const [currentView, setCurrentView] = useState('Select a View')
    const changeView = (newView) => {
        setCurrentView(newView);
        viewwww = newView;
        // console.log(viewwww);
    }

    const [currentMonth, setCurrentMonth] = useState('Select a View')
    const changeMonth = (newMonth) => {
        monthhh = newMonth;
        setCurrentMonth(newMonth);
    }
    const [currentYear, setCurrentYear] = useState('Select Year')
    const changeYear = (newYear) => {
        yearrr = newYear;
        setCurrentYear(newYear);
    }

    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(!showResults);

    const [showCreate, setShowCreate] = React.useState(false)
    const create = () => setShowCreate(!showCreate);

    const [showDelete, setShowDelete] = React.useState(false)
    const remove = () => setShowDelete(!showDelete);

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate()
    async function handleLogout() {
        try {
            await logout();
            navigate("/Login")
        } catch (error) {
            console.log(error.message)
        }
    }

    let gapi = window.gapi
    
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
        var startTimeSplit = eventStartTime.toTimeString().split(" ")
        var endTimeSplit = eventEndTime.toTimeString().split(" ")
        var start = eventDate + "T" + startTimeSplit[0] + "-07:00"
        var end = eventDate + "T" + endTimeSplit[0] + "-07:00"

        return gapi.client.calendar.events.insert({
            "calendarId": `${calendarID}`,
            "sendNotifications": false,
            "resource": {
                "summary": `${eventTitle}`,
                "description": `${eventDescription}`,
                "start": {
                    "dateTime": `${start}`,
                    "timeZone": `${timeZone}`
                },
                "end": {
                    "dateTime": `${end}`,
                    "timeZone": `${timeZone}`
                }
            }
        }).then(function(response) {
            // Handle the results here (response.result has the parsed body).
            fetch('http://localhost:8080/insertEvent', {
                method: 'Post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    userEmail: currentUser.email,
                    eventID: response.result.id,
                    eventTitle: `${eventTitle}`
                })
            }).then(function (res) {
                console.log(res.status);
            });
            console.log("Response", response);
        },
        function(err) { console.error("Execute error", err); });
    }

    function deleteEvent() {        
        fetch('http://localhost:8080/getEeventID', {
            method: 'Post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userEmail: currentUser.email,
                eventTitle: `${eventTitle}`
            })
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            eventID = res.eventID;
        }).then(function () {
            return gapi.client.calendar.events.delete({
                "calendarId": `${calendarID}`,
                "eventId": `${eventID}`,
                "sendNotifications": false,
                "sendUpdates" : "none"
            }).then(function(response) {
                // Handle the results here (response.result has the parsed body).
                eventID = response.result.id;
                fetch('http://localhost:8080/deleteEvent', {
                    method: 'Post',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        userEmail: currentUser.email,
                        eventTitle: `${eventTitle}`
                    })
                }).then(function (res) {
                    console.log(res.status);
                });
                console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
        })
    }

    // function updateEvent() {
    //     var startTimeSplit = eventStartTime.toTimeString().split(" ")
    //     var endTimeSplit = eventEndTime.toTimeString().split(" ")
    //     var start = eventDate + "T" + startTimeSplit[0] + "-07:00"
    //     var end = eventDate + "T" + endTimeSplit[0] + "-07:00"

    //     return gapi.client.calendar.events.update({
    //         "calendarId": `${calendarID}`,
    //         "eventId": `${eventID}`,
    //         "sendNotifications": false,
    //         "sendUpdates": "none",
    //         "supportsAttachments": false,
    //         "resource": {
    //         "end": {
    //             "dateTime": `${end}`
    //         },
    //         "start": {
    //             "dateTime": `${start}`
    //         },
    //         "description": `${eventDescription}`,
    //         "summary": `${eventTitle}`
    //         }
    //     }).then(function(response) {
    //         // Handle the results here (response.result has the parsed body).
    //         console.log("Response", response);
    //     },
    //     function(err) { console.error("Execute error", err); });
    // }

    gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: CLIENT_ID});
    });

    return (
        
        <div>
            <div className="sidebar">
                <div>
                    
                    <input type="submit" class="fontAwesome fa-4x navButton" name="create" value="&#xf271;" onClick={create} />
                    { showCreate ? <CreateView /> : null }
                    <br />
                    <input type="submit" class="fontAwesome fa-4x navButton" name="delete" value="&#xf272;" onClick={remove} />
                    { showDelete ? <DeleteView /> : null }
                </div>
                
                <div>
                    <button onClick={handleLogout} class="fontAwesome fa-4x navButton">&#xf2f5;</button>
                </div>

            </div>
            <div class="content">
                <form class="form-inline">
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
                <input type="submit" value="Search" onClick={onClick} />
                { showResults ? <MonthStuff /> : null }

                <div id="buttons">
                    <button className='apiButtons' id='authorize' onClick={authenticate}>Authorize</button>
                    <button className='apiButtons' id='insertEvent' onClick={insertEvent}>Insert Event</button>
                    <button className='apiButtons' id='deleteEvent' onClick={deleteEvent}>Delete Event</button>
                </div>
            </div>

            
        </div>
    )
}

const CreateView = () => {
    const [title, setTitle] = useState('Title')
    const changeTitle = (newTitle) => {
        setTitle(newTitle);
        eventTitle = newTitle;        
    }

    const [date, setDate] = useState('Date') // 2022-03-17
    const changeDate = (newDate) => {
        setDate(newDate);
        eventDate = newDate;
    }

    const [startTime, setStartTime] = useState('Start Time') // Thu Jan 01 1970 07:34:00 GMT-0500 (EST)
    const changeStartTime = (newStartTime) => {
        setStartTime(newStartTime);
        eventStartTime = newStartTime;
    }

    const [endTime, setEndTime] = useState('Start Time') // Thu Jan 01 1970 07:34:00 GMT-0500 (EST)
    const changeEndTime = (newEndTime) => {
        setEndTime(newEndTime);
        eventEndTime = newEndTime;
    }

    return (
        <form action="">
            <h1>Create Event</h1>
            <ul>
                <li>
                    <label htmlFor="name">Title </label>
                    <input type="text" id="name" name="event_name" class="white" onChange={(event) => changeTitle(event.target.value)} value={title} />
                </li>
                <li>
                    <label htmlFor="date">Date </label>
                    <input type="date" id="date" name="event_date" class="white" onChange={(event) => changeDate(event.target.value)} value={date} />
                </li>
                <li>
                    <label htmlFor="start_time">Start Time </label>
                    <input type="time" id="start_time" name="start_time" class="white" onChange={(event) => changeStartTime(event.target.valueAsDate)} value={startTime} />
                </li>
                <li>
                    <label htmlFor="end_time">End Time </label>
                    <input type="time" id="end_time" name="end_time" class="white" onChange={(event) => changeEndTime(event.target.valueAsDate)} value={endTime} />
                </li>
            </ul>
        </form>
    )
}

const DeleteView = () => {
    const [title, setTitle] = useState('Title')
    const changeTitle = (newTitle) => {
        setTitle(newTitle);
        eventTitle = newTitle;        
    }

    return (
        <form action="">
            <h1>Delete Event</h1>
            <ul>
                <li>
                    <label htmlFor="name">Title </label>
                    <input type="text" id="name" name="event_name" class="white" onChange={(event) => changeTitle(event.target.value)} value={title} />
                </li>
            </ul>
        </form>
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

// 
    const { currentUser } = useAuth();
    let gapi = window.gapi
    
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

    gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: CLIENT_ID});
    });


    function listEvents() {
        var event;
        var eventsArray;

        return gapi.client.calendar.events.list({
            'calendarId': `${calendarID}`,
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function(response) {
            // Handle the results here (response.result has the parsed body).
            // console.log("Response", response);

            eventsArray = response.result.items;
            if (eventsArray.length > 0) {
                for (let i = 0; i < eventsArray.length; i++) {
                    event = eventsArray[i];
                    var when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }
                    events.push(event.summary + ' (' + when + ')')
                }
            }
            // console.log(JSON.stringify(events[0]))
            createSchedule();
            },
            function(err) { console.error("Execute error", err); });
            
    }
// 

    // From https://stackoverflow.com/questions/13146418/find-all-the-days-in-a-month-with-date-object

    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        month = parseInt(month);
        
        while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
        }
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
        tableRow = [];
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

        for (let week in weeks) {

            let final = [];
            let x = weeks[week];
            if (week === "0") {
                let firstDay = x[0].getDay();
                for (let i = 0; i<firstDay; i++) {
                    let cell = (<td></td>);
                    final.push(cell);
                }
            }
            for (let day in x){
                day = x[day].getDate();
                let cell = (<td>{day}</td>);
                final.push(cell);
            }
            tableRow.push(<tr>{final}</tr>);
        }
    }

    function createWeek() {
        tableRow = [];
        head = [];
        let final = [];
        let today = new Date();
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();
        let currentDay = today.getDate();

        month = getDaysInMonth(currentMonth, currentYear);
        createWeeks();
        
        for (let i = (currentDay-1); i < ((currentDay-1)+7); i++) {
            // console.log(month[i]);
            let header;
            let cellContent = month[i].getDate();
            let cell = (<td>{cellContent}</td>);
            
            if(month[i].getDay() === 0 || month[i].getDay() === 6) {
                header = (<th>S</th>);
            } else if (month[i].getDay() === 1) {
                header = (<th>M</th>);
            } else if (month[i].getDay() === 2 || month[i].getDay() === 4) {
                header = (<th>T</th>);
            } else if (month[i].getDay() === 3) {
                header = (<th>W</th>);
            } else {
                header = (<th>F</th>);
            }
            final.push(cell);
            head.push(header);
        }
        tableRow.push(<tr>{final}</tr>);
    }

    function createSchedule() {
        let final = [];
        tableRow = [];

        for (let i = 0; i < (events.length/2); i++) {
            let eventName = events[i].substring(0, events[i].indexOf('('));;
            let time = events[i].substring(events[i].indexOf('(') + 12);
            time = time.slice(0, -1);
            let date = events[i].substring(events[i].indexOf('(') + 1);
            date = date.slice(0, 10);
            let cell = (<tr><td>{date}</td><td>{eventName}</td><td>{time}</td></tr>);
            final.push(cell);
        }
        head.push(<th>Date</th>);
        head.push(<th>Event Name</th>);
        head.push(<th>Time</th>);
        tableRow.push(<tr>{final}</tr>);
    }

    // const [showResults, setShowResults] = React.useState(false);
    // const onClick = () => setShowResults(true)

    if (viewwww == "month") {
        month = getDaysInMonth(monthhh, yearrr);
        createMonth();
    } else if (viewwww == "week") {
        createWeek();
    } else if (viewwww == "schedule") {
        listEvents();
        console.log(head);
    }

    return(
        <div id="results" className="search-results">
            <table><thead><tr>{head}</tr></thead><tbody>{tableRow}</tbody></table>

        </div>
    )
}

export default Calendar;