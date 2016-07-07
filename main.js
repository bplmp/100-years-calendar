var currentYear = new Date().getFullYear();

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(0);
  noStroke();

  inputYear();

  function error() {
    alert("Either you're too old, too young, or that wasn't a year. Reload and try again.");
  }

  function inputYear() {
    var yearBorn = prompt("Your year of birth (YYYY)", "");
    if (!isNaN(yearBorn)) {
      var num = parseInt(yearBorn);
      if (yearBorn > (currentYear - 100) && yearBorn < currentYear) {
        drawCalendar(yearBorn);
      } else {
        error();
      }
    } else {
      error();
    }
  }


}

function drawCalendar(yearBorn) {
  var marginFactor = 500;

  var daysInYear = 365;

  var yearsDifference = currentYear - yearBorn;
  var yearsPassed = yearsDifference - 1;
  var yearsLeft = 100 - yearsDifference;
  var yearsTotal = yearsPassed + yearsLeft + 1;

  function calculateCurrentDay() {
    // http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
  var currentDay = calculateCurrentDay();

  function beforeToday(year, day) {
    if (year < yearsPassed || year === yearsPassed && day < currentDay) {
      return true;
    } else {
      return false;
    }
  }

  if (displayWidth > displayHeight) {
    // horizontal mode:
    var margin = displayWidth / marginFactor;
    var radius = (displayWidth - margin * 2) / daysInYear;
    var rowWidth = (displayWidth - margin * 2) / daysInYear;
    var rowHeight = (displayHeight - (margin * 2)) / yearsTotal;

    for (var j = 0; j < yearsTotal; j++) {
      for (var i = 0; i < daysInYear; i++) {
        if (beforeToday(j, i)) {
          fill(255, 204, 0);
        } else {
          fill(255);
        }
        var x = (radius * i);

        // var totalDayIndex = (j * daysInYear) + i;
        // if (totalDayIndex%6 === 0 ) {
        //   radius = ((displayWidth - margin * 2) / daysInYear) / 1.3;
        //   ellipse(margin + (0 + x), margin + (j * rowHeight), radius, radius);
        //   radius = (displayWidth - margin * 2) / daysInYear;
        // } else {
        //   radius = (displayWidth - margin * 2) / daysInYear;
        //   ellipse(margin + (0 + x), margin + (j * rowHeight), radius, radius);
        // }

        ellipse(margin + (0 + x), margin + (j * rowHeight), radius, radius);
      }
    }
  } else {
    // vertical mode:
    var margin = displayHeight / marginFactor;
    var radius = (displayHeight - margin * 2) / daysInYear;
    var rowWidth = (displayWidth - margin * 2) / yearsTotal;
    var rowHeight = (displayHeight - (margin * 2)) / daysInYear;

    for (var j = 0; j < yearsTotal; j++) {
      for (var i = 0; i < daysInYear; i++) {
        if (beforeToday(j, i)) {
          fill(255, 204, 0);
        } else {
          fill(255);
        }
        var x = (radius * i);
        ellipse(margin + (j * rowWidth), margin + (0 + x), radius, radius);
      }
    }
  }
}
