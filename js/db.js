//MOCK DATABASE FOR ALL WEBPAGES INSTEAD OF REPEATING EVERYTHING
//inb4 worst database design ever, but it's for a prototype so calm down k

//assignments and submissions separate because that's how the client will be getting the data (as opposed to the entire courses db)
var myAssignments = [
{name: 'Sheet 1', url: 'assignment?CS04&2', course: 'Computer Networks', due: moment("2016-02-05").fromNow(), date: '05-02-2016'},
{name: 'Assignment 4', url: 'assignment?AN01&4', course: 'Analog Communication', due: moment("2016-03-01").fromNow(), date: '01-03-2016'}
];

var mySubmissions = [
{name: 'Sheet 0', url: 'assignment?CS04&1', course: 'Computer Networks'},
{name: 'Assignment 3', url: 'assignment?AN01&3', course: 'Analog Communication'},
{name: 'Assignment 2', url: 'assignment?AN01&2', course: 'Analog Communication'},
{name: 'Assignment 1', url: 'assignment?AN01&1', course: 'Analog Communication'}
];

var myCourses = [
{id: 'AN01', subscribed: true, name: 'Analog Communications', school: 'Faculty of Engineering, Alex U', desc: 'Communicate via analog lol', teacher: false, students: [{id: '2362', name: 'Jane Doe'}, {id: '2457', name: 'Daffy Duck'}], teachers: [{id: '1234', name: 'Ronald McDonald', admin: true}, {id: '5678', name: 'Guy from KFC', admin: false}],assignments: [{id: 1, name: 'Assignment 1', submissions: 20, due: moment("2016-04-05").fromNow(), date: "2016-04-05", submitted: true}, {id:2, name: 'Assignment 2', submissions: 5, due: moment("2016-02-01").fromNow(), date: '2016-02-01', submitted: true}, {id:3, name: 'Assignment 3', submissions: 8, due: moment("2016-02-03").fromNow(), date: '2016-02-03', submitted: true}, {id: 4,name: 'Assignment 4', submissions: 5, due: moment("2016-03-01").fromNow(), date: '2016-03-01', submitted: false}]},
{id: 'CS04', subscribed: true, name: 'Computer Networks', school: 'Computer Science, AAST', desc: 'Connect your computers', students: [{id: '2362', name: 'Jane Doe'}, {id: '2457', name: 'Daffy Duck'}], teachers: [{id: '91011', name: 'Barney', admin: true}, {id: '121314', name: 'Luke Skywalker', admin: false}],teacher: false, assignments: [{id: 1, name: 'Sheet 0', submissions: 17, due: moment("2016-04-05").fromNow(), date: '2016-04-05', submitted: true}, {id: 2, name: 'Sheet 1', submissions: 5, due: moment("2016-02-05").fromNow(), date: '2016-02-05', submitted: false}]},
{id: 'IS02', subscribed: false, name: 'Database Systems', school: 'Faculty of Agriculture', desc: 'Make your databases',  students: [{id: '2361', name: 'Anakin Skywalker'}, {id: '6547', name: 'Mr. Moseby'}],teachers: [{id: '2362', name: 'Jane Doe', admin: true}, {id: '1632', name: 'R2D2', admin: false}, {id: '1923', name: 'Poe', admin: false}],teacher: true, admin: true, assignments: [{id: 1, name: 'Sheet 0', submissions: 20, due: moment("2016-01-05").fromNow(), date: '2016-01-05'}]},
{id: 'ME01', subscribed: false, name: 'Stay Up Late', school: 'Life', desc:'You know you wanna', students: [{id: '2361', name: 'Anakin Skywalker'}, {id: '6547', name: 'Mr. Moseby'}], teachers: [{id: '1', name: 'Yoda', admin: true}, {id: '2362', name: 'Jane Doe', admin: false}], teacher: true},
{id: 'ME02', subscribed: false, name: 'Fifth Course Added', school: 'Life', desc:'How to populate a list', students: [{id: '2361', name: 'Anakin Skywalker'}, {id: '6547', name: 'Mr. Moseby'}], teachers: [{id: '2362', name: 'Jane Doe', admin: true}, {id: '010010', name: 'Mr. Robot', admin: false}], teacher: true, admin: true},
{id: 'ME03', subscribed: false, name: 'Sixth Course Added', school: 'Life', desc:'SEE?', students: [{id: '2361', name: 'Anakin Skywalker'}, {id: '6547', name: 'Mr. Moseby'}], teachers: [{id: '000', name: 'Old McDonald', admin: true}, {id: '2362', name: 'Jane Doe', admin: false}], teacher: true}
];

var allStudents = [
{id: '2362', name: 'Jane Doe'},
{id: '2457', name: 'Daffy Duck'},
{id: '2361', name: 'Anakin Skywalker'},
{id: '6547', name: 'Mr. Moseby'}
];

var allSubmissions =[
{course: 'AN01', student: '2362', assignments: [1, 2, 3]},
{course: 'AN01', student: '2457', assignments: [1, 2]},
{course: 'CS04', student: '2362', assignments: [1]},
{course: 'CS04', student: '2457', assignments: [1, 2]},
{course: 'IS02', student: '2361', assignments: [1]}
];


