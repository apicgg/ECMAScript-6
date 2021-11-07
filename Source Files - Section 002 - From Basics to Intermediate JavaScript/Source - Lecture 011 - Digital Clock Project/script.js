// Lecture: Digital Clock Project

/*
function digitalClock() {

    var date = new Date();

    var hours = date.getHours() + '';

    var minutes = date.getMinutes() + '';

    var seconds = date.getSeconds() + '';

    var day = date.getDay();

    if(hours.length < 2) {

        hours = '0' + hours;

    }

    if(minutes.length < 2) {

        minutes = '0' + minutes;

    }

    if(seconds.length < 2) {

        seconds = '0' + seconds;

    }

    var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var clock = weekdays[day] + ' ' + hours + ':' + minutes + ':' + seconds;

    document.getElementById('clock').innerHTML = clock;

    // console.log(clock);

}

digitalClock();

setInterval(digitalClock, 1000);
*/

function digitalClock() {
    var date = new Date()

    var hour = date.getHours() + ''
    var minutes = date.getMinutes() + ''
    var seconds = date.getSeconds() + ''
    var day = date.getDay()

    if (hour.length < 2) {
        hour = '0' + hour
    }

    if (minutes.length < 2) {
        minutes = '0' + minutes
    }

    if (seconds.length < 2) {
        seconds = '0' + seconds
    }

    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    var clock = days[day] + ' ' + hour + ':' + minutes + ':' + seconds

    document.getElementById('clock').innerHTML = clock
}

digitalClock()

setInterval(digitalClock, 1000)