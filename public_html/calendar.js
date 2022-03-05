const calendarPage = (
    <div>
        <div className="sidebar">
            <a href=""><i className="fa-solid fa-calendar-plus"></i></a>
            <a href=""><i className="fa-solid fa-pen-to-square"></i></a>
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
)

ReactDOM.render(
    calendarPage, 
    document.getElementById("calendar")
);

/*
let view = document.getElementById("view").value;
let head = document.getElementById("header");
let body = document.getElementById("days");
let monthInput = document.getElementById("month").value;
let yearInput = document.getElementById("year").value;
let button = document.getElementById("send");
let today = new Date();
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
    console.log(days);
    return days;
}

let month;



function createWeeks() {
    let dayOne = month[0];
    let dayOfWeek = dayOne.getDay();
    let weekCount = 1;
    for (count = 0; count < month.length; count++) {
        if (weekCount == 1){
            week1.push(month[count]);
        } else if (weekCount == 2) {
            week2.push(month[count]);
        }else if (weekCount == 3) {
            week3.push(month[count]);
        } else if (weekCount == 4) {
            week4.push(month[count]);
        } else if (weekCount == 5) {
            week5.push(month[count]);
            monthHasFiveWeeks = true;
        } else {
            week6.push(month[count]);
            monthHasSixWeeks = true;
        }

        if (dayOfWeek == 6) {
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
    let tableHead = document.createElement("tr");
    let sun = document.createElement("th");
    sun.textContent = "S";
    let mon = document.createElement("th");
    mon.textContent = "M";
    let tue = document.createElement("th");
    tue.textContent = "T";
    let wed = document.createElement("th");
    wed.textContent = "W";
    let thu = document.createElement("th");
    thu.textContent = "T";
    let fri = document.createElement("th");
    fri.textContent = "F";
    let sat = document.createElement("th");
    sat.textContent = "S";
    tableHead.append(sun, mon, tue, wed, thu, fri, sat);
    head.append(tableHead);

    for (week in weeks) {
        let tableRow = document.createElement("tr");
        console.log(weeks[week]);
        let x = weeks[week];
        if (week == 0) {
            let firstDay = x[0].getDay();
            for (i = 0; i<firstDay; i++) {
                let cell = document.createElement("td");
                tableRow.append(cell);
            }
        }
        for (day in x){
            console.log(x[day]);
            let cell = document.createElement("td");
            cell.textContent = x[day].getDate();
            tableRow.append(cell);
        }
        
        body.append(tableRow);
    }
}

function createWeek() {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let currentDay = today.getDate();

    month = getDaysInMonth(currentMonth, currentYear);
    createWeeks();
    let tableRow = document.createElement("tr");
    let tableHead = document.createElement("tr")
    for (i = (currentDay-1); i < ((currentDay-1)+7); i++) {
        console.log(month[i]);
        let header = document.createElement("th");
        let cell = document.createElement("td");
        cell.textContent = month[i].getDate();
        if(month[i].getDay() == 0 || month[i].getDay() == 6) {
            header.textContent = "S";
        } else if (month[i].getDay() == 1) {
            header.textContent = "M";
        } else if (month[i].getDay() == 2 || month[i].getDay() == 4) {
            header.textContent = "T";
        } else if (month[i].getDay() == 3) {
            header.textContent = "W";
        } else {
            header.textContent = "F";
        }
        tableRow.append(cell);
        tableHead.append(header);
    }
    head.append(tableHead);
    body.append(tableRow);
}

button.addEventListener("click", function() {
    if (view == "month") {
        month = getDaysInMonth(monthInput, yearInput);
        createMonth();
    } else if (view == "week") {
        createWeek();
    }
});
*/