# Part 1
```javascript
function a(x,y){
  return 5;
}
console.log(a(5,5))
```
### Correct
1. 5

```javascript
function a(x,y){
    z = []
    z.push(x);
    z.push(y);
    z.push(5);
    console.log(z);
    return z;
}
b = a(2,2)
console.log(b);
console.log(a(6,8));
```
### Wrong
1. [2, 2, 5]
2. [2, 2, 5]
3. [6, 8, 5]

### Correct
1. [2, 2, 5]
2. [2, 2, 5]
3. [6, 8, 5]
4. [6, 8, 5]
*Because "console.log(a(6,8))" results in the call from console.log(a()), and then another one inside the method console.log(z)*

```javascript
function a(x){
   z = [];
   z.push(x);
   z.pop();
   z.push(x);
   z.push(x);
   return z;
}
y = a(2);
y.push(5);
console.log(y);
```
### Correct
1. [2, 2, 5]

```javascript
function a(x){
   if(x[0] < x[1]) {
      return true;
   }
   else {
      return false;
   }
}
b = a([2,3,4,5])
console.log(b);
```
### Correct
1. true

```javascript
function a(x){
   for(var i=0; i<x.length; i++){
      if ( x[i] > 0 ) {
         x[i] = 'Coding';
      }
   }
   return x;
}
console.log(a([1,2,3,4]))
```
### Wrong
1. Coding
2. Coding
3. Coding
4. Coding

### Correct
1. ["Coding", "Coding", "Coding", "Coding"]
*Because a() changes each element into "Coding", and does not print them individually*

```javascript
function a(x){
    for(var i=0; i<x.length; i++){
      if(x[i] > 5){
           x[i] = 'Coding';
      }
      else if(x[i] < 0){
           x[i] = 'Dojo';
      }
    }
    return x;
}
console.log(a([5,7,-1,4]))
```
### Wrong
1. Coding
2. Dojo

### Correct
1. [5, "Coding", "Dojo", 4]0
*Because the strings are in the arrays and are not printed

```javascript
function a(x){
   if(x[0] > x[1]) {
    return x[1];
   }
   return 10;
}
b = a([5,10])
console.log(b);
```
### Correct
1. 10

```javascript
function sum(x){
    sum = 0;
    for(var i=0; i<x.length; i++){
       sum = sum + x[i];
       console.log(sum);
    }
    return sum;
}
```
### Correct
1. 


# Part 2

```javascript
function printAverage(x){
   sum = 0;
   // your code here
}
y = printAverage([1,2,3]);
console.log(y); // should log 2
  
y = printAverage([2,5,8]);
console.log(y); // should log 5
```
### Correct
```javascript
/// Answer
function printAverage(x){
   sum = 0;
   let average;
   
   for ( let i = 0; i < x.length; i++ ) {
     sum += x[i];
   }
   
   average = sum / x.length;
   
   return average;
}
y = printAverage([1,2,3]);
console.log(y); // should log 2
  
y = printAverage([2,5,8]);
console.log(y); // should log 5
```

```javascript
function returnOddArray(){
   // your code here
}
y = returnOddArray();
console.log(y); // should log [1,3,5,...,253,255]
```
### Correct
```javascript
// Answer
function returnOddArray(){
	let oddArray = [];
	for ( let i = 1; i <= 255; i+=2 ) {
		oddArray.push(i);
	}
	
	return oddArray;
}
y = returnOddArray();
console.log(y); // should log [1,3,5,...,253,255]
```

```javascript
function squareValue(x){
   // your code here
   return x;
}
y = squareValue([1,2,3]);
console.log(y); // should log [1,4,9]
  
y = squareValue([2,5,8]);
console.log(y); // should log [4,25,64]
```
### Correct
```javascript
// Answer
function squareValue(x){
   for ( let i = 0; i < x.length; i++ ) {
     x[i] *= x[i];
   }
   return x;
}
y = squareValue([1,2,3]);
console.log(y); // should log [1,4,9]
  
y = squareValue([2,5,8]);
console.log(y); // should log [4,25,64]
```