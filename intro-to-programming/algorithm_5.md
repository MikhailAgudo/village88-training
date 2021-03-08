1. Given an array and a value Y, count and print the number of array values greater than Y.

### Correct
```javascript
function arrayVsY (array, y) {
	let count = 0;
	
	for ( let i = 0; i < array.length; i++ ) {
		if ( array[i] > y ) {
			count++;
			console.log(array[i]);
		}
	}
}
```

2. Given an array, print the max, min and average values for that array.

### Correct
```javascript
function maxMinAvg (array) {
	let max = array[0];
	let min = array[0];
	let avg;
	let sum = 0;
	
	for ( let i = 0; i < array.length; i++ ) {
		sum += array[i];
		if ( array[i] > max ) {
			max = array[i];
		}
		
		if ( array[i] < min ) {
			min = array[i];
		}
	}
	
	avg = sum / array.length;
	
	console.log(max);
	console.log(min);
	console.log(avg);
}
```

3. Given an array of numbers, create a function that returns a new array where negative values were replaced with the string ‘Dojo’.   For example, replaceNegatives( [1,2,-3,-5,5]) should return [1,2, "Dojo", "Dojo", 5].

### Correct
```javascript
function negativeDojo (array) {
	for ( let i = 0; i < array.length; i++ ) {
		if ( array[i] < 0 ) {
			array[i] = "Dojo";
		}
	}
	
	return array;
}
negativeDojo( [1,2,-3,-5,5])
```

4. Given array, and indices start and end, remove values in that index range, working in-place (hence shortening the array).  For example, removeVals([20,30,40,50,60,70],2,4) should return [20,30,70].

### Correct
```javascript
function slice (array, start, end) {
	let newArray = [];
	for ( let i = 0; i < array.length; i++ ) {
		if ( i < start || i > end ) {
			newArray.push(array[i]);
		}
	}
	
	return newArray;
}
slice([20,30,40,50,60,70],2,4)
```