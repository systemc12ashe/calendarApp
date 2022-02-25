let monthInput = document.getElementById("month").value;
let yearInput = document.getElementById("year").value;
let button = document.getElementById("send");
let today = new Date();

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

let month = getDaysInMonth(monthInput, yearInput);

function createCalendar(month){
    let week1 = [];
    let week2 = [];
    let week3 = [];
    let week4 = [];
    let week5 = [];
}

button.addEventListener("click", function() {
    days = getDaysInMonth(monthInput, yearInput);
    console.log(monthInput);
    console.log(yearInput);
    console.log(days);
});