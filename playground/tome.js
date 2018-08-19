var moment = require('moment');


// jan 1st 1970 00:00:00 am
/*
var date = new Date();

console.log(date.getMonth());
*/

var someTimestamp = moment().valueOf();


var createdAt = 1234;
var date = moment(createdAt);
/*
date.add(100, 'years').subtract(9,'months')
console.log(date.format('MMM Do, YYYY'));
*/

console.log(date.format('h:mm a'));