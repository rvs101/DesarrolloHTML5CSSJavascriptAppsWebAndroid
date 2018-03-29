﻿(function () {

    // We keep these variables private inside this closure scope
    var myGrades = [93, 95, 88, 0, 55, 91];

    var average = function () {
        var total = myGrades.reduce(function (accumulator, item) {
            return accumulator + item
        }, 0);

        return 'Your average grade is ' + total / myGrades.length + '.';
    }

    var falling = function () {
        var failingGrade = myGrades.filter(function (item) {
            return item < 70;
        });

        return 'You failed : ' + failingGrade.length + ' times.';
    }

    console.log(falling());

}());