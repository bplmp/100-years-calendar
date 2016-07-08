var currentYear = new Date().getFullYear();
var yearBorn;

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(0);
  noStroke();

  // http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
  function getQ(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          if (decodeURIComponent(pair[0]) == variable) {
              return decodeURIComponent(pair[1]);
          }
      }
      console.log('Query variable not found', variable);
  }

  var dob = new Date(getQ('y'), getQ('m'), getQ('d'));
  drawCalendar(dob);

}

function drawCalendar(dateBorn) {
  var daysInYear = 366;

  var yearBorn = dateBorn.getFullYear();
  var dayBorn = calculateFullDay(dateBorn);
  var dowBorn = dateBorn.getDay();

  document.title = '100 Years Calendar – Born ' + dateBorn.toDateString();

  var yearsDifference = currentYear - yearBorn;
  var yearsPassed = yearsDifference - 1;
  var yearsLeft = 100 - yearsDifference;
  var yearsTotal = yearsPassed + yearsLeft + 1;
  var currentDay = calculateFullDay(new Date());

  var marginFactor = 300;
  var smallCircleFactor = 0.8;

  // http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
  function calculateFullDay(date) { // 0 is jan 1st
    var start = new Date(date.getFullYear(), 0, 0);
    var diff = date - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  // http://stackoverflow.com/questions/16353211/check-if-year-is-leap-year-in-javascript
  function leapYear(year) {
    if (new Date(year, 1, 29).getMonth() === 2) {
      return false;
    } else {
      return true;
    }
  }

  function beforeToday(year, day) {
    if (year < yearsPassed || year === yearsPassed && day < currentDay) {
      return true;
    } else {
      return false;
    }
  }

  function setColor(j, i, dayBorn, yearBorn) {
    if (j === 0 && i < dayBorn - 1) { // before born
      fill(0);
    } else if (beforeToday(j, i)) { // after born, before today
      fill(255, 204, 0);
    } else if (j === 100 && i > dayBorn - 1) { // after 100 years, after birthdate
      fill(0);
    } else {
      fill(255);
    }
    if (i === 365 && !leapYear(yearBorn + j)) { // if not leap year, 366 day of year
      fill(0);
    }
  }

  if (displayWidth > displayHeight && windowWidth > windowHeight) {
    // horizontal mode:
    if (windowWidth <= displayWidth) {
      // not mobile
      var margin = windowWidth / marginFactor;
      var radius = (windowWidth - margin * 2) / daysInYear;
      var rowWidth = (windowWidth - margin * 2) / daysInYear;
      var rowHeight = (windowHeight - (margin * 2)) / yearsTotal;

    } else {
      // mobile
      var margin = displayWidth / marginFactor;
      var radius = (displayWidth - margin * 2) / daysInYear;
      var rowWidth = (displayWidth - margin * 2) / daysInYear;
      var rowHeight = (displayHeight - (margin * 2)) / yearsTotal;
      console.log('here')

    }

    for (var j = 0; j <= yearsTotal; j++) {
      var firstDow = new Date (yearBorn + j, 0 , 1).getDay();

      for (var i = 0; i < daysInYear; i++) {
        setColor(j, i, dayBorn, yearBorn);

        var x = margin + (0 + (radius * i));
        var y = margin + (j * rowHeight);

        var dow = (firstDow + i) % 7;
        if (dow === 0) { // sunday
          ellipse(x, y, radius * smallCircleFactor, radius * smallCircleFactor);
        } else {
          ellipse(x, y, radius, radius);
        }

      }
    }
  } else {
    // vertical mode:
    if (windowHeight <= displayHeight) {
      // not mobile
      var margin = windowHeight / marginFactor;
      var radius = (windowHeight - margin * 2) / daysInYear;
      var rowWidth = (windowWidth - margin * 2) / yearsTotal;
      var rowHeight = (windowHeight - (margin * 2)) / daysInYear;
    } else {
      // mobile
      var margin = displayHeight / marginFactor;
      var radius = (displayHeight - margin * 2) / daysInYear;
      var rowWidth = (displayWidth - margin * 2) / yearsTotal;
      var rowHeight = (displayHeight - (margin * 2)) / daysInYear;
    }


    for (var j = 0; j <= yearsTotal; j++) {
      var firstDow = new Date (yearBorn + j, 0 , 1).getDay();

      for (var i = 0; i < daysInYear; i++) {
        setColor(j, i, dayBorn, yearBorn);

        var x = margin + (j * rowWidth);
        var y = margin + (0 + (radius * i));

        var dow = (firstDow + i) % 7;
        if (dow === 0) { // sunday
          ellipse(x, y, radius * smallCircleFactor, radius * smallCircleFactor);
        } else {
          ellipse(x, y, radius, radius);
        }
      }
    }
  }
}
