# Part 1

```javascript
function multiply(x,y){
    console.log(x);
    console.log(y);
}
b = multiply(2,3);
console.log(b);
```
1. 2
2. 3
3. 2
4. 3

```javascript
function multiply(x,y){
    return x*y;
}
b = multiply(2,3);
console.log(b);
console.log(multiply(5,2));
```
1. 6
2. 10

```javascript
var x = [1,2,3,4,5,10];
for(var i=0; i<5; i++)
{
   i = i + 3; 
   console.log(i);
}
```
1. 3

```javascript
var x=15;
console.log(x);
function awesome(){
    var x=10;
    console.log(x);
}
console.log(x);
awesome();
console.log(x);
```
1. 15
2. 15
3. 10
4. 15

```javascript
for(var i=0; i<15; i+=2){
   console.log(i);
}
```
1. 0
2. 2
3. 4
4. 6
5. 8
6. 10
7. 12
8. 14

```javascript
for(var i=0; i<3; i++){
   for(var j=0; j<2; j++){
       console.log(i*j);
   }
}
```
1. 0
2. 0
3. 0
4. 1
5. 0
6. 2

```javascript
function looping(x,y){
   for(var i=0; i<x; i++){
      for(var j=0; j<x; j++){        
          console.log(i*j);
      } 
   }
}
z = looping(3,3);
console.log(z);
```
1. 0
2. 0
3. 0
4. 0
5. 1
6. 2
7. 0
8. 2
9. 4
10. function()

```javascript
function looping(x,y){
   for(var i=0; i<x; i++){
      for(var j=0; j<y; j++){        
         console.log(i*j);
      } 
   }
   return x*y;
}
z = looping(3,5);
console.log(z);
```
1. 0
2. 0
3. 0
4. 0
5. 0
6. 0
7. 1
8. 2
9. 3
10. 4
11. 0
12. 2
13. 4
14. 6
15. 8
16. 15

# Part 2

```javascript
function printUpTo(x){
  // your code here
}
printUpTo(1000); // should print all the integers from 1 to 1000
y = printUpTo(-10); // should return false
console.log(y); // should print false
```
```javascript
// Answer
function printUpTo(x){
	if ( x > 0 ) {
		for ( let i = 0; i < x; i++ ) {
			console.log(i + 1);
		}
	} else {
		return false;
	}
}
```

```javascript
function printSum(x){
  var sum = 0;
  //your code here
  return sum
}
y = printSum(255) // should print all the integers from 0 to 255 and with each integer print the sum so far.
console.log(y) // should print 32640
```
```javascript
// Answer
function printSum(x){
  var sum = 0;
  for ( let i = 1; i <= x; i++ ) {
	sum += i;
	console.log(i);
	console.log(sum);
  }
  return sum;
}
```

```javascript
function printSumArray(x){
  var sum = 0;
  for(var i=0; i<x.length; i++) {
    //your code here
  }
  return sum;
}
console.log( printSumArray([1,2,3]) ); // should log 6
```
```javascript
// Answer
function printSumArray(x){
  var sum = 0;
  for(var i=0; i<x.length; i++) {
    sum += x[i];
  }
  return sum;
}
```