const rxjs = require('rxjs');
const { range, map, filter } = rxjs;

range(1, 10)
.pipe(
	filter(x => x % 2 === 1),
	map(x => 100 + x)
)
.subscribe(x => console.log(x));
console.log();


const { from } = rxjs;

from([1, 2, 3, 4, 5]).pipe(map(val => Math.pow(val, 2)))
.subscribe(value => { console.log(value); });
console.log();


from([
	{ name: 'Palmtoy', age: 35 },
	{ name: 'Lilly', age: 13 },
	{ name: 'Peter', age: 17 },
	{ name: 'Penny', age: 25 }
])
.pipe(filter(user => user.age >= 18))
.subscribe(value => { console.log(value.name + ' is old enough to drink.'); });
console.log();


const { Observable } = rxjs;

const observable = new Observable(subscriber => {
	subscriber.next('Hello,'),
	subscriber.next('My name is...'),
	subscriber.next('palmtoy :)'),
	subscriber.complete()
});

observable.subscribe({
	next: x =>  { console.log(x); },
	error: err => { console.log('Error : ' + err); },
	complete: () => { console.log('Done...'); }
});
console.log();


const { interval, merge, mapTo } = rxjs;

// Emits a number after every 2 seconds
// interval(2000).subscribe(val => console.log(val + ' ~ ' + new Date()));

//emits every second
const ones = interval(1000);
//emit every 2 seconds
const twos = interval(2000);

merge(
	ones.pipe(mapTo('Ones')),
	twos.pipe(mapTo('Twos'))
).subscribe(val => console.log(val + ' ~ ' + new Date()));

